const Employee = require('../models/Employee');
const User = require('../models/User');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department', 'name');

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('department', 'name description')
      .populate('user', 'name email');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `Employee not found with id of ${req.params.id}`
      });
    }

    // Make sure the employee belongs to logged in user or user is admin
    if (
      employee.user._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to access this employee`
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private/Admin
exports.createEmployee = async (req, res) => {
  try {
    // Create user first
    const user = await User.create({
      name: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      password: req.body.password || 'password123', // Default password
      role: req.body.role || 'employee'
    });

    // Add user id to employee
    req.body.user = user._id;

    // Create employee
    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      data: employee
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private/Admin
exports.updateEmployee = async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `Employee not found with id of ${req.params.id}`
      });
    }

    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `Employee not found with id of ${req.params.id}`
      });
    }

    await employee.deleteOne();

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