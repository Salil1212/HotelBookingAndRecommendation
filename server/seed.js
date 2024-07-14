// seed.js
const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/hotel-booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedHotels = [
  { name: "Hotel One", location: "City One", rating: 4.5 },
  { name: "Hotel Two", location: "City Two", rating: 4.0 },
  { name: "Hotel Three", location: "City Three", rating: 3.5 },
];

const seedUser = [
  { name: "Salil Nigam", email: "salilnigam1212@gmail.com" },
  { name: "Rishabh Nigam", email: "rishabhnigam1212@gmail.com" },
];

const seedDB = async () => {
  await Hotel.deleteMany({});
  await Hotel.insertMany(seedHotels);
  await User.deleteMany({});
  await User.insertMany(seedUser);
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();
