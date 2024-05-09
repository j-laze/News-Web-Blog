const express = require("express");
const app = express();
const path = require("path");
const { initalizeDB } = require('./database/initalizeDB');
const { User } = require('./models/user');


(async () => {
    await initalizeDB();
})();


app.set('views', path.join('client/', 'views'));
app.set("view engine", "ejs");
app.use(express.static("client/public"));

const userRouter = require('./routes/user');
const registerRouter = require('./routes/register');
const postRouter = require('./routes/post');
const loginRouter = require('./routes/login');

app.use('/user', userRouter);
app.use('/register', registerRouter);
app.use('/post', postRouter);
app.use('/login', loginRouter);

const posts = [
    { id: 1, title: "foo" },
    { id: 2, title: "bah" },
];

const users = [
  { user_id: 1, username: "qwerty123"}
]

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/authed", (req, res) => {
    var username = req.query.username;
    res.render("logged_in_index", { posts, username });
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
