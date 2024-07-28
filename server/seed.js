// seed.js
const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");
const User = require("./models/User");
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
