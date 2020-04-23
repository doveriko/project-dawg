const mongoose = require("mongoose");
const Dog = require("./../models/dog");
const bcrypt = require("bcrypt");

require("dotenv").config();

const dogs = [
  {
    dogName: "Fuller",
    email: "fuller@fullermail.com",
    password: "aaa",
    age: 9,
    phoneNumber: "(905) 567-3872",
    breed: "springer",
    image:
      "https://www.mundoperros.es/wp-content/uploads/2018/02/perro-springer-spaniel-830x623.jpg",
    activity: "Very Sociable",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "otterhound",
      ageMin: 6,
      ageMax: 12,
    },
  },
  {
    dogName: "Clay",
    email: "clay@claymail.com",
    password: "aaa",
    age: 18,
    phoneNumber: "(870) 411-3479",
    breed: "ridgeback",
    image:
      "https://www.pets4homes.co.uk/images/articles/4786/large/what-sort-of-owner-is-a-good-match-for-a-rhodesian-ridgeback-5b0dd3d2e32e3.jpg",
    activity: "Friendly",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "keeshond",
      ageMin: 6,
      ageMax: 6,
    },
  },
  {
    dogName: "Martin",
    email: "martin@martinmail.com",
    password: "aaa",
    age: 17,
    phoneNumber: "(892) 566-2340",
    breed: "basenji",
    image:
      "https://thehappypuppysite.com/wp-content/uploads/2019/07/Basenji-HP-long.jpg",
    activity: "Shy",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "chihuahua",
      ageMin: 19,
      ageMax: 16,
    },
  },
  {
    dogName: "Park",
    email: "park@parkmail.com",
    password: "aaa",
    age: 12,
    phoneNumber: "(849) 484-3212",
    breed: "cattledog",
    image:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/07/10105842/Australian-Stumpy-Tail-Cattle-Dog-Slideshow-04.jpg",
    activity: "Friendly",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "schnauzer",
      ageMin: 12,
      ageMax: 2,
    },
  },
  {
    dogName: "Camacho",
    email: "camacho@camachomail.com",
    password: "aaa",
    age: 5,
    phoneNumber: "(854) 484-2888",
    breed: "otterhound",
    image: "https://www.dogalize.com/wp-content/uploads/2017/05/otterhound.jpg",
    activity: "Very Sociable",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "greyhound",
      ageMin: 10,
      ageMax: 10,
    },
  },
  {
    dogName: "Bridgette",
    email: "bridgette@bridgettemail.com",
    password: "aaa",
    age: 18,
    phoneNumber: "(911) 554-3753",
    breed: "vizsla",
    image:
      "https://www.rover.com/blog/wp-content/uploads/2017/06/vizsla-puppy-960x540.jpg",
    activity: "Shy",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "basenji",
      ageMin: 3,
      ageMax: 7,
    },
  },
  {
    dogName: "Vinson",
    email: "vinson@vinsonmail.com",
    password: "aaa",
    age: 10,
    phoneNumber: "(992) 433-3368",
    breed: "dalmatian",
    image:
      "https://thehappypuppysite.com/wp-content/uploads/2019/01/Dalmatian-Temperament-long.jpg",
    activity: "Very Sociable",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "bichon-frise",
      ageMin: 14,
      ageMax: 20,
    },
  },
  {
    dogName: "Earnestine",
    email: "earnestine@earnestinemail.com",
    password: "aaa",
    age: 20,
    phoneNumber: "(817) 444-2014",
    breed: "spaniel",
    image:
      "https://www.pets4homes.co.uk/images/breeds/16/large/3af8b94f6412461d376fe0a30808ad93.jpg",
    activity: "Very Sociable",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "bluetick",
      ageMin: 3,
      ageMax: 12,
    },
  },
  {
    dogName: "Jessie",
    email: "jessie@jessiemail.com",
    password: "aaa",
    age: 20,
    phoneNumber: "(834) 423-3855",
    breed: "whippet",
    image:
      "https://www.pets4homes.co.uk/images/breeds/67/e4fde5a27f866896f849ecaa0139dfb9.jpg",
    activity: "Very Sociable",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "hound",
      ageMin: 10,
      ageMax: 1,
    },
  },
  {
    dogName: "Lavonne",
    email: "lavonne@lavonnemail.com",
    password: "aaa",
    age: 9,
    phoneNumber: "(873) 445-2619",
    breed: "pomeranian",
    image:
      "https://www.pets4homes.co.uk/images/articles/4688/large/how-popular-is-the-pomeranian-dog-breed-5ab0cc9437fb0.jpg",
    activity: "Friendly",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "pomeranian",
      ageMin: 17,
      ageMax: 2,
    },
  },
  {
    dogName: "Francesca",
    email: "francesca@francescamail.com",
    password: "aaa",
    age: 4,
    phoneNumber: "(888) 482-3642",
    breed: "havanese",
    image:
      "https://minepuppy.com/wp-content/uploads/2018/02/havanese-breed-minepuppy.jpg",
    activity: "Friendly",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "malinois",
      ageMin: 13,
      ageMax: 2,
    },
  },
  {
    dogName: "Inez",
    email: "inez@inezmail.com",
    password: "aaa",
    age: 17,
    phoneNumber: "(937) 416-2521",
    breed: "shiba",
    image:
      "https://www.rover.com/blog/wp-content/uploads/2019/11/shiba-dreamstime-960x540.jpg",
    activity: "Friendly",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "briard",
      ageMin: 18,
      ageMax: 7,
    },
  },
  {
    dogName: "Celia",
    email: "celia@celiamail.com",
    password: "aaa",
    age: 17,
    phoneNumber: "(996) 546-3186",
    breed: "wolfhound",
    image:
      "https://cdn1-www.dogtime.com/assets/uploads/gallery/irish-wolfhound-dog-breed-pictures/1-size.jpg",
    activity: "Very Sociable",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "everything",
      ageMin: 3,
      ageMax: 16,
    },
  },
  {
    dogName: "Horton",
    email: "horton@hortonmail.com",
    password: "aaa",
    age: 12,
    phoneNumber: "(905) 407-3158",
    breed: "labrador",
    image:
      "https://thehappypuppysite.com/wp-content/uploads/2019/03/How-Long-Do-Labrador-Retriever-Live-long.jpg",
    activity: "Shy",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "dingo",
      ageMin: 7,
      ageMax: 10,
    },
  },
  {
    dogName: "Patel",
    email: "patel@patelmail.com",
    password: "aaa",
    age: 18,
    phoneNumber: "(825) 489-2584",
    breed: "doberman",
    image: "https://ak6.picdn.net/shutterstock/videos/23341816/thumb/1.jpg",
    activity: "Friendly",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "great-dane",
      ageMin: 3,
      ageMax: 4,
    },
  },
  {
    dogName: "Mcdaniel",
    email: "mcdaniel@mcdanielmail.com",
    password: "aaa",
    age: 7,
    phoneNumber: "(833) 453-3941",
    breed: "norwegian-buhund",
    image:
      "https://www.petguide.com/wp-content/uploads/2013/04/norwegian-buhund-2.jpg",
    activity: "Very Sociable",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "entlebucher",
      ageMin: 13,
      ageMax: 13,
    },
  },
  {
    dogName: "Shelby",
    email: "shelby@shelbymail.com",
    password: "aaa",
    age: 3,
    phoneNumber: "(912) 453-2923",
    breed: "stbernard",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51vl-R9u2iL._AC_SX466_.jpg",
    activity: "Shy",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "rottweiler",
      ageMin: 12,
      ageMax: 3,
    },
  },
  {
    dogName: "Bessie",
    email: "bessie@bessiemail.com",
    password: "aaa",
    age: 4,
    phoneNumber: "(904) 514-3615",
    breed: "weimaraner",
    image:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/17155658/Weimaraner-running-into-water.jpg",
    activity: "Friendly",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "schipperke",
      ageMin: 14,
      ageMax: 1,
    },
  },
  {
    dogName: "Lucinda",
    email: "lucinda@lucindamail.com",
    password: "aaa",
    age: 17,
    phoneNumber: "(973) 421-3145",
    breed: "spaniel",
    image:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/16105011/English-Cocker-Spaniel-Slide03.jpg",
    activity: "Shy",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "shihtzu",
      ageMin: 14,
      ageMax: 20,
    },
  },
  {
    dogName: "Ava",
    email: "ava@avamail.com",
    password: "aaa",
    age: 11,
    phoneNumber: "(902) 417-3718",
    breed: "dachshund",
    image: "https://i.ytimg.com/vi/LnVqXoVwjN4/maxresdefault.jpg",
    activity: "Shy",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "bulldog",
      ageMin: 0,
      ageMax: 17,
    },
  },
  {
    dogName: "Greta",
    email: "greta@gretamail.com",
    password: "aaa",
    age: 2,
    phoneNumber: "609 827 923",
    breed: "potato",
    image: "https://img.imgur.com/4zK4EpS.jpg",
    activity: "Very Sociable",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "otterhound",
      ageMin: 6,
      ageMax: 12,
    },
  },
  {
    dogName: "Loki",
    email: "loki@lokimail.com",
    password: "aaa",
    age: 5,
    phoneNumber: "604 293 011",
    breed: "labrador",
    image: "https://img.imgur.com/tx9L4lg.jpg",
    activity: "Very Sociable",
    interactions: [],
    selected: [],
    searchPreferences: {
      breed: "otterhound",
      ageMin: 6,
      ageMax: 12,
    },
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

mongoose
  // 1. Establish connection to Mongo
  .connect(process.env.MONGODB_URI, {
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
  