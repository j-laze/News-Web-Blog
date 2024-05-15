const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
const fs = require("fs");
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


const HTTPS_SERVER = https.createServer({
  key: fs.readFileSync(path.join(__dirname, './SSL_key_cert/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './SSL_key_cert/cert.pem'))
}, app);

HTTPS_SERVER.listen(5000, () => {
  console.log("Server is running on port 5000 with SSL");
});


app.get("/", async (req, res) => {
  const posts = await User.getAllPosts();
  console.log(posts)
  res.render("public_index", { posts });
});


