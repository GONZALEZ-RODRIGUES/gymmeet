const express = require('express');
const usersController = require("./user/user.controller");
const cors = require("cors");
const PORT = process.env.PORT || 5100;
const app = express();
const path = require("path");
const knex = require("./knex");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
// const db = require("../db")
const escapeHtml = require("escape-html");
app.use(express.json());
app.use(cors());
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
    const loggedIn = await usersController.login(req.body);
    console.log(loggedIn)
    if (loggedIn === true) {
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
          res.sendStatus(200);
        });
      });
    } else {
      res.sendStatus(400);
    }
  }
);

app.get("/", isAuthenticated, function (req, res) {
  // this is only called when there is an authentication user due to isAuthenticated

  res.status(200).send("hello, " + escapeHtml(req.session.user));
});

// app.get("/", usersController.getUsers); //done
// app.get("/email", usersController.checkByEmail); //check if user exist by email
// app.get("/:id", todoController.getUsers); //done
app.post("/create", usersController.create); //done returning msg with id
// app.put("/:id", todoController.update); //done returning msg with id
// app.delete("/:id", todoController.delete); //done returning msg with id

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
// serving static html for every path
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});