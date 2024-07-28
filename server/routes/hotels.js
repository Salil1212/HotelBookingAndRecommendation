// routes/hotels.js
const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");
const Activity = require("../models/Activity");
const User = require("../models/User");
const { mongoose } = require("mongoose");

router.get("/", async (req, res) => {
  const hotels = await Hotel.find({});
  console.log(hotels);
  res.json(hotels);
});
router.get("/getDetail", async (req, res) => {
  const hotels = await Hotel.find({ _id: req.query.hotelId });
  res.json(hotels);
});

router.post("/:id/visit", async (req, res) => {
  try {
    const { userId } = req.body;
    const { id: hotelId } = req.params;

    // Check if the activity already exists
    const existingActivity = await Activity.findOne({
      userId,
      hotelId,
      type: "visit",
    });

    if (existingActivity) {
      return res.status(200).json({ message: "Activity already logged" });
    }

    // If it doesn't exist, create a new activity
    const activity = new Activity({
      userId,
      hotelId,
      type: "visit",
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error("Error logging activity:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/:id/completeBooking", async (req, res) => {
  const activity = new Activity({
    userId: req.body.userId,
    hotelId: req.params.id,
    type: "complete",
  });
  await activity.save();
  res.json(activity);
});

router.get("/:id/activities", async (req, res) => {
  const activities = await Activity.find({ hotelId: req.params.id });
  res.json(activities);
});

module.exports = router;
