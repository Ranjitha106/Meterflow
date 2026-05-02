const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  apiKey: String,
  userId: String,  
  endpoint: String,
  timestamp: Date
});

module.exports = mongoose.model("Usage", usageSchema);