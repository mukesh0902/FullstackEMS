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