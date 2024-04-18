const express = require('express');
const app = express();
const path = require('path');
app.set('views', path.join('client/', 'views'));
app.set("view engine", "ejs");
app.use(express.static("client/public"));

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
})



const userRouter = require('./routes/users');
const registerRouter = require('./routes/register');

app.use('/users', userRouter);
app.use('/register', registerRouter);

app.listen(5000, () => { console.log("Server is running on port 5000") });


