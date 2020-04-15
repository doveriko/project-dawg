var express = require("express");
var swipeRouter = express.Router();

swipeRouter.get("/", (req, res) => {
  res.render("swipe")
})

module.exports = swipeRouter;
