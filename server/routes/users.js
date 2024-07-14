const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");
const Activity = require("../models/Activity");
const User = require("../models/User");

router.get("/", async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.json(users);
});
module.exports = router;
