const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.clearCookie('token')
    res.redirect('/');
});

// Other routes...

module.exports = router;