const express = require('express');
const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentsController');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, getDepartments)
  .post(protect, authorize('admin'), createDepartment);

router
  .route('/:id')
  .get(protect, getDepartment)
  .put(protect, authorize('admin'), updateDepartment)
  .delete(protect, authorize('admin'), deleteDepartment);

module.exports = router; 