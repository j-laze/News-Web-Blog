const express = require('express');
const bcrypt = require('bcrypt');
const sequelize = require('../../models/index.js'); // sequelize instance
const { User } = require('../../models/user.js') // user models from db
const router = express.Router();

router.use(express.json()); // for parsing json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


router.get('/', (req, res) => {
    res.render("register", { title: "Register Page" });
});

router.post('/', async (req, res) => {
    const user = await User.create({
        username: 'testUsername',
        email: 'testEmail@test.com',
        passwordHash: 'testPasswordHash',
        twoFactorType: 'testTwoFactorType',
        twoFactorInfo: 'testTwoFactorInfo',
        isAdmin: false,
        accountStatus: 'active'
    });
    console.log(user);
    const { username, email, password } = req.body;
    console.log(username, email, password);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            passwordHash: hashedPassword,
        });
        console.log('User created:', user.toJSON());

        // Redirect to login page
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering new user');
    }
});

module.exports = router;