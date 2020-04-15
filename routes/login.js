var express = require("express");
var loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render("login")
})

module.exports = loginRouter;
