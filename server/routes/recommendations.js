const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const Hotel = require("../models/Hotel");
const { mongoose } = require("mongoose");

router.get("/", async (req, res) => {
  const userId = req.query.userId;

  // Debugging statements
  console.log("Received userId:", userId);

  if (!userId) {
    return res
      .status(400)
      .json({ error: "userId query parameter is required" });
  }

  // Ensure userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    const activities = await Activity.find({ userId });

    // Debugging statement
    console.log("Found activities:", activities);

    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
