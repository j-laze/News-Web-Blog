const express = require('express');
const app = express();
const path = require('path');
//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
//const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');

app.set('views', path.join('client/', 'views'));
app.set("view engine", "ejs");
app.use(express.static("client/public"));


app.get('/', (req, res) => {
    res.render("index", { title: "Home Page" });

});
const userRouter = require('./routes/user');
const registerRouter = require('./routes/register');
//const postRouter = require('./routes/post');
//const loginRouter = require('./routes/login')(passport);


app.use('/user', userRouter);
//app.use('/post', postRouter);
//app.use('/login', loginRouter);
app.use('/register', registerRouter);


app.listen(5000, () => { console.log("Server is running on port 5000") });


