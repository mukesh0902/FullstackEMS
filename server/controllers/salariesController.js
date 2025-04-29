const Salary = require('../models/Salary');
const Employee = require('../models/Employee');

// @desc    Get all salaries
// @route   GET /api/salaries
// @access  Private/Admin
exports.getSalaries = async (req, res) => {
  try {
    let query;

    // If user is not admin, only show their own salary records
    if (req.user.role !== 'admin') {
      const employee = await Employee.findOne({ user: req.user.id });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'No employee profile found'
        });
      }

      query = Salary.find({ employee: employee._id });
    } else {
      query = Salary.find();
    }

    // Execute query
    const salaries = await query.populate({
      path: 'employee',
      select: 'firstName lastName employeeId',
      populate: {
        path: 'department',
        select: 'name'
      }
    });

    res.status(200).json({
      success: true,
      count: salaries.length,
      data: salaries
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single salary
// @route   GET /api/salaries/:id
// @access  Private
exports.getSalary = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id).populate({
      path: 'employee',
      select: 'firstName lastName employeeId',
      populate: {
        path: 'department',
        select: 'name'
      }
    });

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: `Salary not found with id of ${req.params.id}`
      });
    }

    // Make sure user is the salary owner or admin
    if (req.user.role !== 'admin') {
      const employee = await Employee.findOne({ user: req.user.id });

      if (!employee || salary.employee._id.toString() !== employee._id.toString()) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized to access this salary record'
        });
      }
    }

    res.status(200).json({
      success: true,
      data: salary
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new salary
// @route   POST /api/salaries
// @access  Private/Admin
exports.createSalary = async (req, res) => {
  try {
    const employee = await Employee.findById(req.body.employee);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'No employee found with that ID'
      });
    }

    // Calculate netSalary if not provided
    if (!req.body.netSalary) {
      const basicSalary = req.body.basicSalary || 0;
      const allowances = req.body.allowances || 0;
      const deductions = req.body.deductions || 0;
      const bonus = req.body.bonus || 0;

      req.body.netSalary = basicSalary + allowances + bonus - deductions;
    }

    const salary = await Salary.create(req.body);

    res.status(201).json({
      success: true,
      data: salary
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update salary
// @route   PUT /api/salaries/:id
// @access  Private/Admin
exports.updateSalary = async (req, res) => {
  try {
    let salary = await Salary.findById(req.params.id);

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: `Salary not found with id of ${req.params.id}`
      });
    }

    // Only admin can update salary records
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update salary records'
      });
    }

    // Calculate netSalary if any salary components are updated
    if (req.body.basicSalary || req.body.allowances || req.body.deductions || req.body.bonus) {
      const basicSalary = req.body.basicSalary || salary.basicSalary;
      const allowances = req.body.allowances || salary.allowances;
      const deductions = req.body.deductions || salary.deductions;
      const bonus = req.body.bonus || salary.bonus;

      req.body.netSalary = basicSalary + allowances + bonus - deductions;
    }

    salary = await Salary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: salary
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete salary
// @route   DELETE /api/salaries/:id
// @access  Private/Admin
exports.deleteSalary = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: `Salary not found with id of ${req.params.id}`
      });
    }

    // Only admin can delete salary records
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete salary records'
      });
    }

    await salary.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}; 