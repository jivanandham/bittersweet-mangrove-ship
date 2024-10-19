const mongoose = require('mongoose');
require('dotenv').config();  // Ensure environment variables are loaded

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,  // Set timeout to 5 seconds
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
