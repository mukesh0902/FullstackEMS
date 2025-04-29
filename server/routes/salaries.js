const express = require('express');
const {
  getSalaries,
  getSalary,
  createSalary,
  updateSalary,
  deleteSalary
} = require('../controllers/salariesController');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, getSalaries)
  .post(protect, authorize('admin'), createSalary);

router
  .route('/:id')
  .get(protect, getSalary)
  .put(protect, authorize('admin'), updateSalary)
  .delete(protect, authorize('admin'), deleteSalary);

module.exports = router; 