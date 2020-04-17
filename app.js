// Load .env values
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");
const createError = require("http-errors");
const morgan = require("morgan");
// const bodyParser   = require('body-parser');

// Packages for authentication:
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var router = require("./routes/auth-routes");
var privateRouter = require("./routes/site-routes");

const dbName = "tinder-dogs";

const app = express();

mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

// const app_name = require("./package.json").name;
// const debug = require("debug")(
//   `${app_name}:${path.basename(__filename).split(".")[0]}`
// );

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

// Middleware Setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

// Session middleware
// The session package creates a new session middleware for authentication
app.use(
  session({
    secret: "dawg-secret", // Used to sign the session ID cookie
    cookie: { maxAge: 3600000 * 1 },	// expiration date of the cookie (1 day, in milliseconds)
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      // Creates a new instance of connect-mongo to store the session information in our Mongo DB
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 7, // Time to live - 7 days (14 days - Default)
    }),
  })
);

// default value for title local
app.locals.title = "DAWG - A social network for your dog";

// Routes
app.use("/", router);
app.use("/", privateRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
