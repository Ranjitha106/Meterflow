

const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
  {
    userId: String,
    key: String
  },
  { timestamps: true } 
);

module.exports = mongoose.model("ApiKey", apiKeySchema);