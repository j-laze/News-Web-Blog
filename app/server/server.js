const express = require("express");
const app = express();
const path = require("path");
app.set("views", path.join("client/", "views"));
app.set("view engine", "ejs");
app.use(express.static("client/public"));

const userRouter = require("./routes/users");
const registerRouter = require("./routes/register");

app.use("/users", userRouter);
app.use("/register", registerRouter);

const posts = [
  { id: 1, title: "foo" },
  { id: 2, title: "bah" },
];

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/authed", (req, res) => {
  res.render("logged_in_index", { posts });
});

app.get("/authed/posts/:id", (req, res) => {
  const post_id = req.params.id;
  const post = posts.find((post) => post.id == post_id);

  if (post) {
    res.render(`post${post.id}`, { post });
  } else {
    res.status(404);
  }
});
