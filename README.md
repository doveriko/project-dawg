# DAWG

## Description

Dawg is a social app designed for dogs. Their owners would create a profile where to look for new friends for his best friend (even if it sounds like a paradox) according to filters like age, breed or level of activity. When a match is found, the owners would have access to each other's contact numbers and allow their pets to meet. This is a makeover of an original [pair project](https://github.com/guillemtubert/Dawg).



## User Stories

- **Sign up** - As a user I want to sign up to register the details of my dog, my basic personal info and some searching filters to find the perfect match for my dog.
- **Login** - As a user I want to be able to log in on the webpage so that I can start searching for dogs.
- **Logout** - As a user I want to be able to log out from the app to keep my use of it private.
- **Swipe** - As a user I want to go through the list of candidates and select (green button) or reject (red button) potential mates for my pet.
- **Match** - As a user I want to be able to see the dogs that like me back. When that happens, a "match" is created and displayed in a section of the app. Then, the contact number of the other dog's owner is revealed so we can meet.
- **Profile** - As a user I want to see my dog's info gathered in a profile that I can edit, delete or use to log out.


## Routes (back-end)

#### Auth routes (public):

| **Method** | **Route** | **Description**                                              | Request  - Body                                              |
| ---------- | --------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| GET        | /         | Main page route.  Renders home index view.                   |                                                              |
| GET        | /login    | Renders login form view.                                     |                                                              |
| POST       | /login    | Sends login form data to the server.                         | { email, password }                                          |
| GET        | /signup   | Renders signup form view.                                    |                                                              |
| POST       | /signup   | Sends sign up info to the server and creates user in the DB. | { dogName, email, image, password, age, phoneNumber, breed, activity, searchPreferences } |

#### Site routes (private):

| Method | Route               | Description                                                  | Request - body                                               |
| ------ | ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `GET`  | /profile            | Renders profile view                                         | req.session.currentUser, _id, dogName, age, breed, image, activity, searchPreferences |
| `GET`  | /profile/edit       | Renders profile-edit view                                    | req.session.currentUser                                      |
| PUT    | /profile/edit       | Updates personal info, dog info and search preferences       | req.session.currentUser, { dogName, email, image, password, age, phoneNumber, breed, activity, searchPreferences } |
| DELETE | /profile/delete/:id | Delete the user's account                                    | req.params.id                                                |
| GET    | /swipe              | Renders swipe view                                           | req.session.currentUser                                      |
| GET    | /match              | Renders match view                                           | req.session.currentUser                                      |
| POST   | /match/:id          | Tracks the interaction between Dogs and passes it to the Match collection | req.session.currentUser                                      |



## Models

Dog Schema:

```javascript
  {
    dogName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 0, required: true },
    phoneNumber: { type: String, required: true },
    breed: { type: String, required: true },
    image: {
      type: String,
      default: "http://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/256/22215-dog-icon.png",
    },
    activity: { type: String },
    interactions: [{ type: Schema.Types.ObjectId, ref: "Match" }],
    selected: [{type: Schema.Types.ObjectId, ref: "Dog"}],
    searchPreferences: {
      breed: { type: String },
      ageMin: { type: Number, min: 0, max: 19 },
      ageMax: { type: Number, min: 0, max: 20 },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }

```

Match Schema:

```javascript
{
  dogOneId: { type: Schema.Types.ObjectId, ref: "Dog" },
  dogTwoId: { type: Schema.Types.ObjectId, ref: "Dog" },
  dogOneAnswer: {
    type: String,
    enum: ["like", "reject", "pending"],
    default: "pending",
  },
  dogTwoAnswer: {
    type: String,
    enum: ["like", "reject", "pending"],
    default: "pending",
  },
  success: {
    type: String,
    enum: ["success", "rejected", "awaiting"],
    default: "awaiting",
  },
}

```



## Backlog

- Add more searching filters.
- Add a chat.
- Geo Location: add a map and filter dogs by distance.
- Create and join events.



## Links

[Repository](https://github.com/doveriko/project-dawg)

[Deploy](https://dawg-app.herokuapp.com/)

[Original project](https://github.com/guillemtubert/Dawg)