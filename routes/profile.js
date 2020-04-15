var express = require("express");
var profileRouter = express.Router();

profileRouter.get("/", (req, res) => {
  res.render("profile")
})

module.exports = profileRouter;
