const express = require('express');
const usersController = require("./user/user.controller");
const meetController = require("./meet/meet.controller");
const participantsController = require("./participants/participants.controller");
const cors = require("cors");
const PORT = process.env.PORT || 5100;
const app = express();
const path = require("path");
const knex = require("./knex");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
// const db = require("../db")
const escapeHtml = require("escape-html");
const participantsModel = require('./participants/participants.model');
const userController = require('./user/user.controller');
app.use(express.json());
const corsOptions = {
  origin: 'https://gymmeet.onrender.com/', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/", express.static("../client/dist"));

const store = new KnexSessionStore({
    knex,
    tablename: "sessions",
  });

app.use(
  session({
    secret: "keyboard dog",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 6000000, // 10 mins
    },
    store,
  })
);

function isAuthenticated(req, res, next) {
    if (req.session.user) next();
    else next("route");
}

// //login user
app.post(
  "/login",
  express.urlencoded({ extended: false }),
  async function (req, res) {
    // login logic to validate req.body.user and req.body.pass
    const user = await usersController.login(req.body);

    if (user) {
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err);

        // store user information in session, typically a user id
        req.session.user = req.body.email;
        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err);
          res.status(200).send(user);
        });
      });
    } else {
      res.status(400).send(false);
    }
  }
);

app.get("/", isAuthenticated, function (req, res) {
  // this is only called when there is an authentication user due to isAuthenticated

  res.status(200).send("hello, " + escapeHtml(req.session.user));
});

app.post("/create", usersController.create); //done returning msg with id
app.get("/meetuser/:id", meetController.getUserMeets); // usar para pegar os dados de meet daquele user
app.post("/createmeet", meetController.create); //done returning msg with id
app.get("/meetparticipants/:id", participantsController.getParticipants); //done returning all participants
app.get("/suggestionmeets/:id", meetController.getSuggestionMeets);
app.post("/joinmeet", participantsController.joinMeet);
app.patch("update", userController.update);
app.delete("delete", userController.delete);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
// serving static html for every path
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});