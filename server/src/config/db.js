const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fixitnow');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('MongoDB connection failed. Using in-memory storage instead.');
    // We'll continue without MongoDB for development purposes
  }
};

module.exports = connectDB; 