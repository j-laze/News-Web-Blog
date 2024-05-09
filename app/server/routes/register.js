const express = require('express');
const bcrypt = require('bcrypt');
const database = require('../database/initalizeDB.js');
const { User } = require('../models/user.js')// user models from db
const router = express.Router();

router.use(express.json()); // for parsing json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function containsXSS(text) {
    return text.match(/(<[^>]*>)(.*?)([^>]*>)/);
}

function isStrongPassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?_@#$%^&*]).{8,}$/.test(password);
}

router.get('/', (req, res) => {
    res.render("register", { title: "Register Page", error_message: "none", showPasswordRules: false });
});

router.post('/', async (req, res) => {
    const { email, username, password, confirm_password } = req.body;
    
    //* Check for valid email address pattern
    if (!isValidEmail(email)) {
        
        return res.render("register", { error_message: "Invalid Email Address.", showPasswordRules: false });
    }

    //* Check that the password contain html tags
    if (containsXSS(email) || containsXSS(username) || containsXSS(password) || containsXSS(confirm_password)) {
        //console.log(containsXSS(email.value))
        
        return res.render("register", { error_message: "Invalid Information. Please try again.", showPasswordRules: false });
    }

    //* Check that confirm password and password are the same
    if (password != confirm_password) {
        return res.render("register", { error_message: "Password confirmation failed. Passwords don't match.", showPasswordRules: false});
    }

    //* Check that the password conforms to password rules
    if (!isStrongPassword(password)) {
        return res.render("register", { error_message: "Password must contain at least:", showPasswordRules: true })
    }

    await User.create({username, password, email});
    res.redirect('/');
});

module.exports = router;