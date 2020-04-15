# DOGGY

## Description

Doggy is an app to meet new dogs arround you. You can create a profile, search for new dog friends and chat with them!

## User Stories

- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **Delete match**  - As a user I want to be able to delete a match that I don't want anymore
- **match** - As a user I want to be able to see the dogs arround me, like them or reject them.
- **Direct Messages** - Chat with the dogs you've matched!
- **Profile** - See your profile. Edit it and change the search settings



## Backlog

List of other features outside of the MVPs scope

Creating events:
- Create events.
- Join different events.
- Earn points / upgrade levels.

Geo Location:
- Filter the dogs by distance.

Homepage
- Adding new future features.


## Routes (Back-end):



| **Method** | **Route**                           | **Description**                                              | Request  - Body                                              |
| ---------- | ----------------------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| `GET`      | `/`                                 | Main page route.  Renders home `index` view.                 |                                                              |
| `GET`      | `/login`                            | Renders `login` form view.                                   |                                                              |
| `POST`     | `/login`                            | Sends Login form data to the server.                         | { email, password }                                          |
| `GET`      | `/signup`                           | Renders `signup` form view.                                  |                                                              |
| `POST`     | `/signup`                           | Sends Sign Up info to the server and creates user in the DB. | { email, password, [dogName], [phoneNumber], [breed], [age], [imageUrl], [activity] } |
| `GET`      | `/private/edit-profile`             | Private route. Renders `edit-profile` form view.             |                                                              |
| `PUT`      | `/private/edit-profile`             | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [dogName], [phoneNumber], [breed], [age], [imageUrl], [activity] } |
| `POST`     | /private/search-preferences         | Private route. Add the preferences you would like to search with. | {[breed], [age]}                                             |
| `POST`     | `/private/favorites/`               | Private route. Adds a new favorite for the current user.     | { [dogName], [image], [phoneNumber] }                        |
| `DELETE`   | `/private/match/:successfulMatchId` | Private route. Deletes the existing favorite from the current user. |                                                              |

## Models

Doggy model

```javascript
{
  email: { type: String, required: true }
  password: { type: String, required: true }
  dogName: { type: String, required: true }
  phoneNumber: { type: Number, required: true }
  breed: { type: String, enum: ['bulldog', 'shi tzu', (...)], required: true},
  age: { type: Number, required: true }
  image: { type: String, default: "./img/default.jpg" }
  activity: { type: String, enum: ["Shy","Friendly","Very Sociable"], required: true},
  interactions: [matchId],
}

```



Match model

```javascript
{
  dogOneId: {type: Schema.Types.ObjectId, ref:"Doggy"},
  dogTwoId: {type: Schema.Types.ObjectId, ref:"Doggy"}
  dogOneAnswer: { type: String, enum: ["like","reject","pending"], default: "pending" },
  dogTwoAnswer: { type: String, enum: ["like","reject","pending"], default: "pending" },
  success: { type: String, enum: ["success","rejected","awaiting"], default: "awaiting" },
}

```

## Links

### Trello

[Open the trello!](https://trello.com/b/WuUgMfQq/project-2-doggy)

### Git

[Repository Link](https://github.com/guillemtubert/Doggy)

[Deploy Link](https://dawg-project.herokuapp.com/)

### Slides 

[Slides Link](https://docs.google.com/presentation/d/1maTh19snJx0KqOmr5Z6mSbECEX2EyE4BDtyz2u09eM8/edit?usp=sharing)
