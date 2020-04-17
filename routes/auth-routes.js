const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signupRouter = require("./signup");

router.use("/login", loginRouter);
router.use("/signup", signupRouter);

// If user is not logged in, go to "index" (sign-up page)
router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
  res.render('index');
  } else {
    res.render('profile')
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

module.exports = router;