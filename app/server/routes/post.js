const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const generic_methods = require("../scripts/generic.js");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", (req, res) => {
  var username = req.query.username;
  res.render("create_post", { error_message: "none", username });
});

router.post("/", async (req, res) => {
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

  if (title.length < 1) {
    return res.render("create_post", {
      error_message: "Error creating post. Please try again.",
      username: "test69",
    });
  }

  res.redirect(`/authed?username=test69`);
});

module.exports = router;
