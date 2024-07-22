// seed.js
const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/hotel-booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedHotels = [
  {
    name: "Hotel One",
    location: "City One",
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=600", // Example URL
  },
  {
    name: "Hotel Two",
    location: "City Two",
    rating: 4.0,
    image:
      "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Hotel Three",
    location: "City Three",
    rating: 3.5,
    image:
      "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
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
