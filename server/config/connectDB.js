const mongoose = require("mongoose");
const envConstants = require("../constants/envConstants");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envConstants.MONGO_URI);
    console.log(`DATABASE CONNECTION SUCCESSFUL WITH: ${conn.connection.host}`);
  } catch (error) {
    console.log("DATABASE CONNECTION FAILED: " + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
