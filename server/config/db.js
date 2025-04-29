const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use hardcoded URI as fallback if environment variable is not set
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_ms';
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 