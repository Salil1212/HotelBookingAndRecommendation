// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const hotelRoutes = require("./routes/hotels");
const userRoutes = require("./routes/users");
const recommendationRoutes = require("./routes/recommendations");

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
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
[
  {
    _id: "66926456e0efa06ac81bbf96",
    name: "Salil Nigam",
    email: "salilnigam1212@gmail.com",
    __v: 0,
    createdAt: "2024-07-13T11:26:14.945Z",
    updatedAt: "2024-07-13T11:26:14.945Z",
  },
  {
    _id: "66926456e0efa06ac81bbf97",
    name: "Rishabh Nigam",
    email: "rishabhnigam1212@gmail.com",
    __v: 0,
    createdAt: "2024-07-13T11:26:14.945Z",
    updatedAt: "2024-07-13T11:26:14.945Z",
  },
][
  ({
    _id: "66926456e0efa06ac81bbf91",
    name: "Hotel One",
    location: "City One",
    rating: 4.5,
    __v: 0,
    createdAt: "2024-07-13T11:26:14.932Z",
    updatedAt: "2024-07-13T11:26:14.932Z",
  },
  {
    _id: "66926456e0efa06ac81bbf92",
    name: "Hotel Two",
    location: "City Two",
    rating: 4,
    __v: 0,
    createdAt: "2024-07-13T11:26:14.933Z",
    updatedAt: "2024-07-13T11:26:14.933Z",
  },
  {
    _id: "66926456e0efa06ac81bbf93",
    name: "Hotel Three",
    location: "City Three",
    rating: 3.5,
    __v: 0,
    createdAt: "2024-07-13T11:26:14.933Z",
    updatedAt: "2024-07-13T11:26:14.933Z",
  })
];
