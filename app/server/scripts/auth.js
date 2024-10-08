const jwt = require('jsonwebtoken');
const { User } = require('../models/user.js'); // user models from db
const jwt_secret = 'test';
const { client: database } = require('../database/initalizeDB.js');


async function isauthed(req, res, next) {
    await console.log("here should be token ", req.cookies)
    try {
        // Verify the token and extract the user ID
        const decodedToken = jwt.verify(req.cookies.token, jwt_secret);
        req.user_id = decodedToken.user_id;
        const decoded_user_id = req.user_id
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const values = [decoded_user_id];
        const result = await database.query(query, values);
        if (result.rows.length > 0) {
            // User exists, check ipaddress matches
            const current_user_ip = req.connection.remoteAddress;
            if(decodedToken.ipaddress !== current_user_ip){
                console.log("IP Address does not match");
                console.log(decodedToken.ipaddress, current_user_ip);
                return res.status(401).render('login', {
                    message: 'Invalid token'
                });
            }
            // User is authenticated, proceed to the next middleware function or route handler
            next();
        } else {
            // User does not exist, return an error
            return res.status(401).render('login', {
                message: 'Invalid token'
            });
        }
    } catch (err) {
        // Token is not valid or user does not exist
        console.log(err.message);
        res.status(401).render('login', {
            message: 'Token expired or tampered'
        });
    }
}

module.exports = { isauthed };