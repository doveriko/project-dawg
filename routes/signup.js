var express = require("express");
var signupRouter = express.Router();
// 1 - Require `bcrypt` for passwords hashing
const bcrypt = require("bcrypt")
// 2 - Create variable for the number of salt rounds
const saltRounds = 10;

const Dog = require("../models/dog")
const parser = require('../config/cloudinary');


// GET /signup

signupRouter.get("/", (req, res) => {
  res.render("signup")
})


// POST /signup

signupRouter.post("/", parser.single('image'), (req, res, next) => {
  // 3 - Deconstruct the properties of the new user ("dog") from req.body
  const { dogName, email, password, age, phoneNumber, breed, activity, prefBreed, prefAgeMin, prefAgeMax } = req.body;
  
  const searchPreferencesObj = {
    breed: prefBreed, 
    ageMin: prefAgeMin,
    ageMax: prefAgeMax
  }

  const image = req.file.secure_url

  // 4 - Check if any of the required fields are empty and display error message
  if (dogName === "" || email === "" || password === "" || age === "" || phoneNumber === "" || breed  === "") {
    res.render("signup", {
      errorMessage: "Oops, there must be some information missing...",
    });
    return;
  }

  // 5 - Check in the dogs collection if the email already exists (must be unique)
  Dog.findOne({ email })
  .then(user => {
    // If that email already exists in the DB, redirect to 'signup' and display error message
    if (user) {
      console.log("E-mail of the user ->", user);
      res.render("signup", {
        errorMessage: "Hmmm... the e-mail you entered is already registered"
      });
      return;
    }

    // If the email is not registered, proceed to create the user ("dog")
    // First generate salts and hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Then create the new user ("dog") in DB
    Dog.create({ dogName, image, email, password: hashedPassword, age, phoneNumber, breed, activity, searchPreferences: searchPreferencesObj })
      .then(dogCreated => {
        req.session.currentUser = dogCreated;
        res.redirect("/swipe")
      })
      .catch(err => {
        res.render("signup", {
          errorMessage: "There has been some error. Could you try again?"
        });
      });
  })
  .catch(err => console.log(err));
});


module.exports = signupRouter;
