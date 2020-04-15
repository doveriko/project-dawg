var express = require('express');
var privateRouter  = express.Router();
//const Dog = require("../models/dog");

const profileRouter = require('./profile')
const swipeRouter = require ('./swipe')
const matchRouter = require ('./match')

// PROTECTED ROUTES
privateRouter.use("/profile", profileRouter);
privateRouter.use("/swipe", swipeRouter);
privateRouter.use("/match", matchRouter);

// AUTHENTICATION CHECKER
privateRouter.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  }
  else {
  	res.redirect("/login");
  }
});	

privateRouter.get("/", (req, res, next) => {
  res.render("swipe");
});

module.exports = privateRouter;