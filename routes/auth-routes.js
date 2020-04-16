const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signupRouter = require("./signup");

router.use("/login", loginRouter);
router.use("/signup", signupRouter);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

module.exports = router;