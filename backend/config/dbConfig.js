const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connection successfully established");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = connection;
