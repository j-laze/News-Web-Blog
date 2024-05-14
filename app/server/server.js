const express = require("express");
const app = express();
const path = require("path");
const { initializeDB } = require("./database/initalizeDB");
const { User } = require("./models/user");

(async () => {
  await initializeDB();
})();

app.set("views", path.join("client/", "views"));
app.set("view engine", "ejs");
app.use(express.static("client/public"));

const userRouter = require("./routes/user");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const authRouter = require("./routes/auth");
const logoutRouter = require("./routes/logout");

app.use("/user", userRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use("/logout", logoutRouter);

const posts = [
  { id: 1, title: "foo", content: "lorem ipsum..." },
  {
    id: 2,
    title: "CONFIDENTIAL",
    content: "Hello world",
  },
];

const users = [{ user_id: 1, username: "qwerty123" }];

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});


app.get("/", async (req, res) => {
  const posts = await User.getAllPosts();
  console.log(posts)
  res.render("public_index", { posts });
});


