const express = require('express');
const bcrypt = require('bcrypt');
const database = require('../database/initalizeDB.js');
const { User } = require('../models/user.js')// user models from db
const router = express.Router();

router.use(express.json()); // for parsing json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


router.get('/', (req, res) => {
    res.render("register", { title: "Register Page" });
});

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;
    await User.create({username, password, email});
    res.redirect('/index.html');
});

module.exports = router;