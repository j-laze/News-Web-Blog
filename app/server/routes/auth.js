const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser());
const { User } = require("../models/user.js"); // user models from db
const jwt_secret = "test";
const { client: database } = require("../database/initalizeDB.js");
const jwt = require("jsonwebtoken");
const generic_methods = require("../scripts/generic");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", isauthed, async (req, res) => {
  const posts = await User.getUserPosts(req.user_id);
  console.log(posts)
  res.render("logged_in_index", {title: "Logged In Index", posts});

});

router.get("/createpost", isauthed, (req, res) => {
  res.render("create_post", { error_message: "none" });
});

router.post("/postpage", isauthed, async (req, res) => {
  const post = JSON.parse(req.body.postId);
  res.render("post_page", { post });
  
});

router.post("/createpost", isauthed, async (req, res) => {
  var { title, text_body } = await req.body;

  console.log(`Title: ${title}\nContent: ${text_body}`);

  if (
    generic_methods.containsXSS(title) ||
    generic_methods.containsXSS(text_body)
  ) {
    title = generic_methods.replaceXSS(title);
    console.log(`Sanitised title: ${title}`);
    text_body = generic_methods.replaceXSS(text_body);
    console.log(`Sanitised content: ${text_body}`);
  }
  User.createPost(req.user_id, title, text_body);

  res.redirect(`/auth`);
});

router.get("/dashboard", isauthed, async (req, res) => {
  try {
    const posts = await User.getUserPosts(req.user_id);
    res.render("dashboard", { posts });
  } catch (error) {
    console.error(error);
  }
});

async function isauthed(req, res, next) {
  try {
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(req.cookies.token, jwt_secret);
    req.user_id = decodedToken.user_id;
    const decoded_user_id = req.user_id;
    const query = "SELECT * FROM users WHERE user_id = $1";
    const values = [decoded_user_id];
    const result = await database.query(query, values);
    if (result.rows.length > 0) {
      // User exists, check ipaddress matches
      const current_user_ip = req.connection.remoteAddress;
      if (decodedToken.ipaddress !== current_user_ip) {
        console.log("IP Address does not match");
        console.log(decodedToken.ipaddress, current_user_ip);
        return res.status(401).render("login", {
          message: "Invalid token",
        });
      }
      // User is authenticated, proceed to the next middleware function or route handler
      next();
    } else {
      // User does not exist, return an error
      return res.status(401).render("login", {
        message: "Invalid token",
      });
    }
  } catch (err) {
    // Token is not valid or user does not exist
    console.log(err.message);
    res.status(401).render("login", {
      message: "Token expired or tampered",
    });
  }
}
module.exports = router;
