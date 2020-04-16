require("dotenv").config();

const mongoose = require("mongoose");
const Dog = require("./../models/dog");
const bcrypt = require("bcrypt");

const dogs = [
  {
    "dogName": "Fuller",
    "email": "fuller@fullermail.com",
    "password": "aaa",
    "age": 9,
    "phoneNumber": "(905) 567-3872",
    "breed": "springer",
    "image": "https://www.mundoperros.es/wp-content/uploads/2018/02/perro-springer-spaniel-830x623.jpg",
    "activity": "Very Sociable",
    "interactions": [],
    "selected": [],
    "searchPreferences": {
      "breed": "otterhound",
      "ageMin": 6,
      "ageMax": 12
    }
  },
  {
    "dogName": "Clay",
    "email": "clay@claymail.com",
    "password": "aaa",
    "age": 18,
    "phoneNumber": "(870) 411-3479",
    "breed": "ridgeback",
    "image": "https://www.pets4homes.co.uk/images/articles/4786/large/what-sort-of-owner-is-a-good-match-for-a-rhodesian-ridgeback-5b0dd3d2e32e3.jpg",
    "activity": "Friendly",
    "interactions": [],
    "selected": [],
    "searchPreferences": {
      "breed": "keeshond",
      "ageMin": 6,
      "ageMax": 6
    }
  },
  {
    "dogName": "Martin",
    "email": "martin@martinmail.com",
    "password": "aaa",
    "age": 17,
    "phoneNumber": "(892) 566-2340",
    "breed": "basenji",
    "image": "https://thehappypuppysite.com/wp-content/uploads/2019/07/Basenji-HP-long.jpg",
    "activity": "Shy",
    "interactions": [],
    "selected": [],
    "searchPreferences": {
      "breed": "chihuahua",
      "ageMin": 19,
      "ageMax": 16
    }
  },
  {
    "dogName": "Park",
    "email": "park@parkmail.com",
    "password": "aaa",
    "age": 12,
    "phoneNumber": "(849) 484-3212",
    "breed": "cattledog",
    "image": "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/07/10105842/Australian-Stumpy-Tail-Cattle-Dog-Slideshow-04.jpg",
    "activity": "Friendly",
    "interactions": [],
    "selected": [],
    "searchPreferences": {
      "breed": "schnauzer",
      "ageMin": 12,
      "ageMax": 2
    }
  }
];

// CONNECT SEED TO MONGO

// 0. Encrypt passwords before adding the users ("dogs") to the DB
const saltRounds = 10;

const encryptedDogs = dogs.map((dog) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(dog.password, salt);

  dog.password = hashedPassword;
  return dog;
});

const dbName = "tinder-dogs";

mongoose
  // 1. Establish connection to Mongo
  .connect(`mongodb://localhost:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connectionObj) => {
    console.log("Connected to database");
    // 2. Reset database (not to have duplicates)
    const dropDB = connectionObj.connection.dropDatabase();
    return dropDB;
  })
  .then(() => {
    console.log("Database dropped");
    // 3. Create collection of dogs from the array of dogs
    const newDB = Dog.create(encryptedDogs); // dogs with encrypted passwords
    return newDB;
  })
  .then((createdDogs) => {
    console.log(`${createdDogs.length} dogs created`);
    // 4. Close the DB connection
    const closeConnection = mongoose.connection.close();
    return closeConnection;
  })
  .then(() => console.log("Connection closed"))
  .catch((err) => console.log("Error connecting to Mongo", err));
