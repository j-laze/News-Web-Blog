const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Users Page")
})

router.get('/logged_in_index', (req, res) => {
    res.render('logged_in_index', { title: "Logged In Index" });
});

module.exports = router;

