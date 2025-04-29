const mongoose = require('mongoose');
const User = require('../models/User');
const Department = require('../models/Department');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Use a hardcoded MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/employee_ms';
console.log('Using MongoDB URI:', MONGO_URI);

// Connect to DB
mongoose.connect(MONGO_URI);

// Create admin user
const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created:', admin.email);
  } catch (err) {
    console.error('Error creating admin user:', err.message);
  }
};

// Create departments
const createDepartments = async () => {
  try {
    // Check if departments already exist
    const departmentsCount = await Department.countDocuments();

    if (departmentsCount > 0) {
      console.log('Departments already exist');
      return;
    }

    // Create departments
    const departments = await Department.insertMany([
      {
        name: 'IT',
        description: 'Information Technology Department'
      },
      {
        name: 'HR',
        description: 'Human Resources Department'
      },
      {
        name: 'Finance',
        description: 'Finance and Accounting Department'
      },
      {
        name: 'Marketing',
        description: 'Marketing and Sales Department'
      },
      {
        name: 'Operations',
        description: 'Operations Department'
      }
    ]);

    console.log(`${departments.length} departments created`);
  } catch (err) {
    console.error('Error creating departments:', err.message);
  }
};

// Run seed functions
const seedData = async () => {
  try {
    await createAdminUser();
    await createDepartments();

    console.log('Seed data created successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err.message);
    process.exit(1);
  }
};

seedData(); 