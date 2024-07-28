const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

// Middleware to check if the user is an admin
router.use(authenticate);
router.use(isAdmin);

// CRUD Operations

// Create a new hotel
router.post("/hotels", async (req, res) => {
  try {
    const { name, location, rating, image } = req.body;
    const newHotel = new Hotel({ name, location, rating, image });
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Read all hotels
router.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update a hotel
router.put("/hotels/:id", async (req, res) => {
  try {
    const { name, location, rating, image } = req.body;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { name, location, rating, image },
      { new: true }
    );
    if (!updatedHotel)
      return res.status(404).json({ message: "Hotel not found" });
    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a hotel
router.delete("/hotels/:id", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel)
      return res.status(404).json({ message: "Hotel not found" });
    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
