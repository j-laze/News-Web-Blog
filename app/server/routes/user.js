const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var username = req.query.username;
    res.render("profile", { username });
})

router.get('/logged_in_index', (req, res) => {
    res.render('logged_in_index', { title: "Logged In Index" });
});

module.exports = router;

