

const ApiKey = require("../models/ApiKey");
const Usage = require("../models/Usage");


const requestCounts = {};

module.exports = async (req, res, next) => {
  try {
    const key = req.headers["x-api-key"];

    if (!key) {
      return res.status(401).json("API Key required");
    }

    
    const valid = await ApiKey.findOne({ key });

    if (!valid) {
      return res.status(403).json("Invalid API Key");
    }

  
    if (!requestCounts[key]) {
      requestCounts[key] = { count: 1, startTime: Date.now() };
    } else {
      const currentTime = Date.now();
      const diff = (currentTime - requestCounts[key].startTime) / 1000;

      if (diff < 60) {
        requestCounts[key].count += 1;

        if (requestCounts[key].count > 5) {
          return res.status(429).json("Rate limit exceeded 🚫");
        }
      } else {
       
        requestCounts[key] = { count: 1, startTime: Date.now() };
      }
    }

    
    await Usage.create({
  apiKey: key,
  userId: valid.userId,   // ✅ ADD THIS LINE
  endpoint: req.originalUrl,
  timestamp: new Date()
});

    next();

  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};