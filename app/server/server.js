const express = require("express");
const app = express();
const path = require("path");
//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
//const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');

app.set('views', path.join('client/', 'views'));
app.set("view engine", "ejs");
app.use(express.static("client/public"));

const userRouter = require('./routes/user');
const registerRouter = require('./routes/register');
//const postRouter = require('./routes/post');
//const loginRouter = require('./routes/login')(passport);

app.use('/user', userRouter);
app.use('/register', registerRouter);
//app.use('/post', postRouter);
//app.use('/login', loginRouter);

const posts = [
    { id: 1, title: "foo" },
    { id: 2, title: "bah" },
];

app.get("/authed", (req, res) => {
    res.render("logged_in_index", { posts });
});

app.get("/authed/posts/:id", (req, res) => {
    const post_id = req.params.id;
    const post = posts.find((post) => post.id == post_id);


app.get('/', (req, res) => {
    res.render("index", { title: "Home Page" });

});

    if (post) {
        res.render(`post${post.id}`, { post });
    } else {
        res.status(404);
    }
});

app.listen(5000, () => { console.log("Server is running on port 5000") });

