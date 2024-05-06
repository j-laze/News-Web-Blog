const express = require('express');
const router = express.Router();
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;


router.get('/', (req, res) => {
    res.render("login", { title: "Login Page" });
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