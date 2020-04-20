var express = require("express");
var profileRouter = express.Router();

const Dog = require("../models/dog")

profileRouter.get("/", (req, res) => {

  const {_id} = req.session.currentUser;

  Dog.findOne({_id})
  .then((dog) => {

    const { _id, dogName, age, breed, image, activity, searchPreferences } = dog

    res.render("profile", { _id, dogName, age, breed, image, activity, searchPreferences })
  })
  .catch((err) => console.log(err));
})

profileRouter.get("/edit", (req, res) => {

  const {_id} = req.session.currentUser

  console.log(req.session.currentUser.phoneNumber);
  

  Dog.findOne({_id})
  .then( (dog) => res.render("profile-edit", {dog}))
  .catch( (err) => console.log(err));
})

profileRouter.post("/edit", (req, res) => {

  const {_id} = req.session.currentUser
  const { dogName, phoneNumber, email, age, breed, activity } = req.body;
  
  const searchPreferences = {
    breed: req.body.prefBreed, 
    ageMin: req.body.prefAgeMin,
    ageMax: req.body.prefAgeMax
  }

  Dog.updateOne({_id},{ dogName, phoneNumber, email, age, breed, activity, searchPreferences })
  .then( () => res.redirect("/profile"))
  .catch( (err) => console.log(err));
})

profileRouter.post("/delete/:id", (req, res) => {  
  
  Dog.findOneAndDelete(req.params.id)
  .then( req.session.destroy() )
  .then(() => {
    res.render("index", {
      errorMessage: "Your account has been deleted"
    });
  })
  .catch( (err) => console.log(err))
})

module.exports = profileRouter;


