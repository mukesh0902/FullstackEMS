const express = require('express');
const {
  getLeaves,
  getLeave,
  createLeave,
  updateLeave,
  deleteLeave
} = require('../controllers/leavesController');

const { protect } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, getLeaves)
  .post(protect, createLeave);

router
  .route('/:id')
  .get(protect, getLeave)
  .put(protect, updateLeave)
  .delete(protect, deleteLeave);

module.exports = router; 