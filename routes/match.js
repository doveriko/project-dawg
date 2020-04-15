var express = require("express");
var matchRouter = express.Router();

matchRouter.get("/", (req, res) => {
  res.render("match")
})

module.exports = matchRouter;
