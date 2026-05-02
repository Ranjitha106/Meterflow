const auth = require("../middleware/authMiddleware");
const router = require("express").Router();
const ApiKey = require("../models/ApiKey");
const apiKeyMiddleware = require("../middleware/apiKeyMiddleware");
const Usage = require("../models/Usage");


router.post("/create-key", async (req, res) => {
  const key = Math.random().toString(36).substring(2);

  const apiKey = await ApiKey.create({
    userId: req.body.userId,
    key
  });

  res.json(apiKey);
});



router.get("/proxy", apiKeyMiddleware, async (req, res) => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await data.json();

  res.json(json);
});


router.get("/usage", auth, async (req, res) => {
  const data = await Usage.find({ userId: req.user.id });
  res.json(data);
});


router.get("/keys", auth, async (req, res) => {
  const keys = await ApiKey.find({ userId: req.user.id });
  res.json(keys);
});

router.get("/usage-count", auth, async (req, res) => {
  const data = await Usage.aggregate([
    {
      $match: { userId: req.user.id } // 🔥 IMPORTANT
    },
    {
      $group: {
        _id: "$apiKey",
        totalRequests: { $sum: 1 }
      }
    }
  ]);

  res.json(data);
});





router.get("/billing", auth, async (req, res) => {
  const data = await Usage.aggregate([
    {
      $match: { userId: req.user.id } // ✅ THIS IS THE MAIN FIX
    },
    {
      $group: {
        _id: "$apiKey",
        totalRequests: { $sum: 1 }
      }
    }
  ]);

  const billing = data.map(item => {
    const freeLimit = 10;
    const extraRequests = Math.max(item.totalRequests - freeLimit, 0);
    const cost = extraRequests * 1;

    return {
      apiKey: item._id,
      totalRequests: item.totalRequests,
      bill: cost
    };
  });

  res.json(billing);
});
module.exports = router;