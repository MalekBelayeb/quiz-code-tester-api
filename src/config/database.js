const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI || 'mongodb://localhost:27017/post-clean-code', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.info("Successfully connected to database");
    })
    .catch((error) => {
      console.log("Database connection failed. exiting now...",error);
      console.error(error);
      process.exit(1);
    });
};
    

