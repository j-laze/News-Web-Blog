const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { User } = require("../models/user.js"); // user models from db
const url = require("url");
const generic_methods = require("../scripts/generic.js");

// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", (req, res) => {
  res.render("login", { title: "Login Page", error_message: "none" });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { email, password } = await req.body;
  const hashedPassword = await User.hash(password);
  console.log(email, hashedPassword, password);

  //* Check for valid email address pattern
  if (!generic_methods.isValidEmail(email)) {
    return res.render("login", {
      error_message: "Invalid Email Address or Password.",
    });
  }

  //* Check that the password contain html tags
  if (
    generic_methods.containsXSS(email) ||
    generic_methods.containsXSS(password)
  ) {
    //console.log(containsXSS(email.value))

    return res.render("login", {
      error_message: "Invalid Email Address or Password.",
    });
  }

  try {
    var user = await User.loginCheck(email, password, res);
  } catch (error) {
    return res.render("login", {
      error_message: "Invalid Email Address or Password.",
    });
  }
  //console.log(user.username)
  return res.redirect(
    url.format({
      pathname: "/authed",
      query: {
        username: user.username,
      },
    })
  );
});

// passport.use(new localStrategy(
//     async (username, password, done) => {
//         return done(null, username);
//     })
// );
//
//
// router.post('/', (req, res, next) => {
//     passport.authenticate('local', async (err, user, info) => {
//         if (err) {
//           res.send("error")
//         }
//         if (!user) {
//             res.send("No User Exists")
//         }
//     })(req, res, next)
// });

module.exports = router;
