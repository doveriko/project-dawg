var express = require("express");
var swipeRouter = express.Router();

swipeRouter.get("/", (req, res) => {
  const user = req.session.currentUser.dogName;
  res.render("swipe", {user})
})

module.exports = swipeRouter;
