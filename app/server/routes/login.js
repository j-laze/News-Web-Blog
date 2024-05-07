const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;

router.use(bodyParser.urlencoded( { extended: false } ));
router.use(express.json());

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function containsXSS(text) {
    return text.match(/(<[^>]*>)(.*?)([^>]*>)/);
}

router.get('/', (req, res) => {
    res.render("login", { title: "Login Page" });
});

router.post('/', async (req, res) => {
    const {email, password} = req.body;

    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    //* Check for valid email address pattern
    if (!isValidEmail(email)) {
        
        return res.redirect("/login");
    }

    //* Check that the password contain html tags
    if (containsXSS(email) || containsXSS(password)) {
        //console.log(containsXSS(email.value))
        
        return res.redirect("/login");
    }

    return res.redirect("/authed");
});









// passport.use(new localStrategy(
//     async (username, password, done) => {
//         return done(null, username);
//     })
// );
//
//
// router.post('/', (req, res, next) => {
//     passport.authenticate('local', async (err, user, info) => {
//         if (err) {
//           res.send("error")
//         }
//         if (!user) {
//             res.send("No User Exists")
//         }
//     })(req, res, next)
// });

module.exports = router;