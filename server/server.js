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

mongoose.connect("mongodb://localhost:27017/hotel-booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
