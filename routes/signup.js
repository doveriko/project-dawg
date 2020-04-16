var express = require("express");
var signupRouter = express.Router();
// 1 - Require `bcrypt` for passwords hashing
const bcrypt = require("bcrypt")
// 2 - Create variable for the number of salt rounds
const saltRounds = 10;
// var zxcvbn = require("zxcvbn");

const Dog = require("../models/dog")

signupRouter.get("/", (req, res) => {
  res.render("signup")
})

signupRouter.post("/", (req, res, next) => {
  // 3 - Deconstruct the properties of the new user ("dog") from req.body
  const searchPreferencesObj = {
    breed: prefBreed, 
    ageMin: prefAgeMin,
    ageMax: prefAgeMax
  }

  const { dogName, email, password, age, phoneNumber, breed, activity, prefBreed, prefAgeMin, prefAgeMax } = req.body;
  // image will go separately due to Cloudinary config

  // 4 - Check if any of the required fields are empty and display error message
  if (dogName === "" || email === "" || password === "" || age === "" || phoneNumber === "" || breed  === "") {
    res.render("signup", {
      errorMessage: "Oops, there must be some information missing...",
    });
    return;
  }

    // Check the password strength
  /*   if (zxcvbn(password).score < 3) {
    res.render("auth/signup-form", {
      errorMessage: "Password too weak, try again"
    });
    return;
  } */

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
    Dog.create({ dogName, email, password: hashedPassword, age, phoneNumber, breed, image, activity, searchPreferencesObj })
      .then(dogCreated => res.redirect("/swipe"))
      .catch(err => {
        res.render("signup", {
          errorMessage: "There has been some error. Could you try again?"
        });
      });
  })
  .catch(err => console.log(err));
});

module.exports = signupRouter;
