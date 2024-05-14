const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await User.getUserPosts(req.user_id);
    res.render("profile", { posts });
  } catch (error) {
    console.error(error);
  }
});

router.get("/logged_in_index", (req, res) => {
  res.render("logged_in_index", { title: "Logged In Index" });
});

module.exports = router;
