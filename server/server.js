// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const hotelRoutes = require("./routes/hotels");
const userRoutes = require("./routes/users");
const recommendationRoutes = require("./routes/recommendations");
const adminRoutes = require("./routes/admin");
const app = express();
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();


async function main() {
  try {
    await mongoose.connect(process.env.mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
}

main();
app.get("/", (req, res) => {
  res.json("This is home page");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/hotels", hotelRoutes);
app.use("/recommendations", recommendationRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
// salilnigam2021
// EO7s9dO0wc7xrvXp