var express = require("express");
var loginRouter = express.Router();
const bcrypt = require("bcrypt")

const Dog = require("../models/dog");

loginRouter.get("/", (req, res) => {
  res.render("login");
});

loginRouter.post("/", (req, res, next) => {

  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("login", {
      errorMessage: "Please enter both e-mail and password to sign up.",
    });
    return;
  }

  Dog.findOne({ email })
    .then(user => {
      if (!user) {
        res.render("login", {
          errorMessage: "That e-mail is not registered. Please, try again.",
        });
        return;
      }

      const passwordFromDB = user.password
      const passwordChecker = bcrypt.compareSync(password, passwordFromDB)

      if (passwordChecker) {
        // Create/save the user session:
        req.session.currentUser = user;
        res.redirect("/swipe");
      } else {
        res.render("login", {
          errorMessage: "Incorrect password. Please, try again.",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = loginRouter;
