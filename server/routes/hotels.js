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
  const activity = new Activity({
    userId: req.body.userId,
    hotelId: req.params.id,
    type: "visit",
  });
  await activity.save();
  res.json(activity);
});

router.post("/:id/draftBooking", async (req, res) => {
  const activity = new Activity({
    userId: req.body.userId,
    hotelId: req.params.id,
    type: "draft",
  });
  await activity.save();
  res.json(activity);
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
