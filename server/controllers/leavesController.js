const Leave = require('../models/Leave');
const Employee = require('../models/Employee');

// @desc    Get all leaves
// @route   GET /api/leaves
// @access  Private/Admin
exports.getLeaves = async (req, res) => {
  try {
    let query;

    // If user is not admin, only show leaves for their employee record
    if (req.user.role !== 'admin') {
      const employee = await Employee.findOne({ user: req.user.id });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'No employee profile found'
        });
      }

      query = Leave.find({ employee: employee._id });
    } else {
      query = Leave.find();
    }

    // Execute query
    const leaves = await query.populate({
      path: 'employee',
      select: 'firstName lastName employeeId',
      populate: {
        path: 'department',
        select: 'name'
      }
    });

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single leave
// @route   GET /api/leaves/:id
// @access  Private
exports.getLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate({
      path: 'employee',
      select: 'firstName lastName employeeId',
      populate: {
        path: 'department',
        select: 'name'
      }
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: `Leave not found with id of ${req.params.id}`
      });
    }

    // Make sure user is the leave owner or admin
    if (req.user.role !== 'admin') {
      const employee = await Employee.findOne({ user: req.user.id });

      if (!employee || leave.employee._id.toString() !== employee._id.toString()) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized to access this leave'
        });
      }
    }

    res.status(200).json({
      success: true,
      data: leave
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new leave
// @route   POST /api/leaves
// @access  Private
exports.createLeave = async (req, res) => {
  try {
    // Find employee for the logged in user
    const employee = await Employee.findOne({ user: req.user.id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'No employee profile found'
      });
    }

    // Set the employee ID to the found employee
    req.body.employee = employee._id;

    const leave = await Leave.create(req.body);

    res.status(201).json({
      success: true,
      data: leave
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update leave
// @route   PUT /api/leaves/:id
// @access  Private
exports.updateLeave = async (req, res) => {
  try {
    let leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: `Leave not found with id of ${req.params.id}`
      });
    }

    // Make sure user is the leave owner or admin
    if (req.user.role !== 'admin') {
      const employee = await Employee.findOne({ user: req.user.id });

      if (!employee || leave.employee.toString() !== employee._id.toString()) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized to update this leave'
        });
      }

      // Employees can only update certain fields
      const allowedFields = ['reason', 'startDate', 'endDate', 'leaveType'];
      Object.keys(req.body).forEach(key => {
        if (!allowedFields.includes(key)) {
          delete req.body[key];
        }
      });
    } else {
      // Set approvedBy if status is being updated by admin
      if (req.body.status) {
        req.body.approvedBy = req.user.id;
      }
    }

    leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: leave
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete leave
// @route   DELETE /api/leaves/:id
// @access  Private
exports.deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: `Leave not found with id of ${req.params.id}`
      });
    }

    // Make sure user is the leave owner or admin
    if (req.user.role !== 'admin') {
      const employee = await Employee.findOne({ user: req.user.id });

      if (!employee || leave.employee.toString() !== employee._id.toString()) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized to delete this leave'
        });
      }

      // Employees can only delete leaves that are still pending
      if (leave.status !== 'pending') {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete leave that has already been approved or rejected'
        });
      }
    }

    await leave.deleteOne();

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