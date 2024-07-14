const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      name,
      email,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// exports.login = async (req, res) => {
//   const { name, email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "Invalid email or password" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     // console.log(token);
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.name !== name) {
      return res.status(400).json({ message: "Invalid name or email" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout user
exports.logout = async (req, res) => {
  // Simply return success message, frontend will handle token removal
  res.status(200).json({ message: "User logged out successfully" });
};
