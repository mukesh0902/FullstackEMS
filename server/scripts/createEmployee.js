const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Use hardcoded URI as fallback if environment variable is not set
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_ms';

// Connect to DB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

const createEmployee = async () => {
  try {
    // Check if employee already exists
    const employeeExists = await User.findOne({ email: 'employee@example.com' });

    if (employeeExists) {
      console.log('Employee user already exists');
      return process.exit();
    }

    // Create employee user
    const employee = await User.create({
      name: 'Employee User',
      email: 'employee@example.com',
      password: 'employee123',
      role: 'employee'
    });

    console.log('Employee user created:', employee.email);
    console.log('Password: employee123');

    process.exit();
  } catch (err) {
    console.error('Error creating employee user:', err.message);
    process.exit(1);
  }
};

createEmployee(); 