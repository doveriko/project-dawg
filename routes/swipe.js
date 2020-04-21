var express = require("express");
var swipeRouter = express.Router();

const Dog = require("../models/dog");


// GET /swipe

swipeRouter.get("/", (req, res) => {
  const { _id } = req.session.currentUser;

  Dog.findOne({ _id }).then((myDog) => {
    let excludedDogs;
    if (myDog.selected.length === 0) {
      excludedDogs = [_id];
    } else {
      excludedDogs = [...myDog.selected, _id];
    }

    Dog.find({ _id: { $nin: excludedDogs } })
      .then((randomDogs) => {
        if (randomDogs.length === 0) {
          res.render("not-found");
          return;
        } else {
          let randomNumber = Math.floor(Math.random() * randomDogs.length);
          let randomDog = randomDogs[randomNumber];

          const data = {
            dogRandom: randomDog,
          };

          res.render("swipe", data);
        }
      })
      .catch((err) => console.log(err));
  });
});


module.exports = swipeRouter;
