const express = require('express');
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeesController');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Get current logged in employee
router.get('/me', protect, async (req, res) => {
  try {
    // Since we already have the user from auth middleware
    // we can just return it with additional data
    const user = req.user;

    // Additional data can be fetched here from other collections
    // like department, salary, leaves, etc.

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        name: user.name,
        email: user.email,
        role: user.role,
        position: 'Employee', // This should be fetched from actual data
        department: {
          name: 'Your Department' // This should be fetched from actual data
        },
        joinDate: user.createdAt,
        status: 'active',
        leaves: {
          approved: 2,
          pending: 1,
          rejected: 0,
          available: 18
        },
        salary: {
          current: {
            month: new Date().toLocaleString('default', { month: 'long' }),
            year: new Date().getFullYear().toString(),
            amount: 3500,
            status: 'pending'
          },
          last: {
            month: new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' }),
            year: new Date().getFullYear().toString(),
            amount: 3500,
            status: 'paid'
          }
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

router
  .route('/')
  .get(protect, authorize('admin'), getEmployees)
  .post(protect, authorize('admin'), createEmployee);

router
  .route('/:id')
  .get(protect, getEmployee)
  .put(protect, authorize('admin'), updateEmployee)
  .delete(protect, authorize('admin'), deleteEmployee);

module.exports = router; 