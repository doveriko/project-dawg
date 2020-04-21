var express = require("express");
var matchRouter = express.Router();

const Dog = require("../models/dog");
const Match = require("../models/match");


// GET /match

matchRouter.get('/',  (req, res) => {
  const {_id} = req.session.currentUser;
  Match.find({success:"success", $or:[ {dogOneId: _id}, {dogTwoId: _id}]})
    .populate("dogOneId dogTwoId") 
    .then( (matches) => {
      const filteredMatches = matches.map(matchObj => {
        if (String(matchObj.dogOneId._id) == String(_id)) {
          return matchObj.dogTwoId
        }
        else{
          return matchObj.dogOneId
        }
      })
      res.render('match', {matches: filteredMatches})
    })
    .catch(err => console.log(err)
    )
});


// POST /match/:id

matchRouter.post('/:id', (req, res, next) =>{
  const matchedDog = req.params.id;

  Dog.findById(req.session.currentUser._id).populate('interactions')
  .then( (dog) => {
    let alreadyMatched = false
    if (dog.interactions.length) {

      for (let i = 0; i < dog.interactions.length; i++) {
        const interaction = dog.interactions[i];
        
        if (String(interaction.dogOneId) == matchedDog || String(interaction.dogTwoId) == matchedDog ) {
          alreadyMatched = interaction; 
          break;
        } 
      }
    }
    // console.log('alreadyMatched', alreadyMatched);

    if(!alreadyMatched) {
      const dogOneId = req.session.currentUser._id;
      const dogTwoId = matchedDog;
      const dogOneAnswer = req.body.answer;

      Match.create({dogOneId, dogTwoId, dogOneAnswer})
        .then( (createMatch) => {
          const { dogTwoId } = createMatch;

          const pr1 = Dog.findByIdAndUpdate(req.session.currentUser._id, {$push:{ interactions: createMatch }});
          const pr2 = Dog.findByIdAndUpdate(req.session.currentUser._id, {$push:{ selected: dogTwoId }});
          const pr3 = Dog.findByIdAndUpdate(matchedDog ,{$push:{"interactions": createMatch }})
          const whenBothUpdatedPr = Promise.all([pr1, pr2, pr3]);
          return whenBothUpdatedPr;
      })
      .then((updatedDogs)=>{
      // console.log('UPDATED DOGS OPERATIONS: \n', updatedDogs);
        
        res.redirect("/swipe")
      })
      .catch((err) => console.log(err));
    } 
     else {
      console.log("Matched");
      
      const dogTwoAnswer = req.body.answer;
      // console.log('data we have:', alreadyMatched, dogTwoAnswer);

      let state;

      if (alreadyMatched.dogOneAnswer === "like" && dogTwoAnswer === "like"){
        state = "success";
      } else {
        state = "rejected";
      }
      // console.log({alreadyMatched, dogTwoAnswer, state});
      
      Match.findByIdAndUpdate(alreadyMatched._id, {dogTwoAnswer, success: state}, {new:true})
      .then((updatedMatch)=>{
        const { dogOneId } = updatedMatch
        const pr = Dog.findByIdAndUpdate(req.session.currentUser._id, {$push:{ selected: dogOneId }});
        return pr;
      })
      .then(() => {
        res.redirect("/swipe")
      })
    }
  })
})


module.exports = matchRouter;