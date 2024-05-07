const {client: database}  = require('../database/initalizeDB.js');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require("uuid");
const bcrypt = require('bcrypt');

const jwt_secret = "test"



class User {

    static async hash (item_to_hash){
        return await bcrypt.hash(item_to_hash, 10);
    }


    static async create({username, password, email }) {
        const user_id = await uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO users (user_id, username, password, email)
            VALUES ($1, $2, $3, $4)`;

        const values = [user_id, username, hashedPassword, email];

        try {
            await database.query(query, values);

        } catch (error) {
            console.error(error);
            throw new Error('Error creating user');
        }
    }


    static async loginCheck({email, password}) {
        const query = `
            SELECT * FROM users
            WHERE email = email`;

        try {
            const result = await database.query(query);
            console.log(result.rows)
            const user = result.rows[0];
            if (!user) {
                throw new Error('User not found');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Password incorrect');
            }
            return user;

        } catch (error) {
            console.error(error);
            throw new Error('Error logging in');
        }
    }






   static async createUsertoken({user_id}) {
        let ipaddress = "test"
        let payload = {user_id, ipaddress}
       return jwt.sign(payload, jwt_secret, {expiresIn: '1h'})

   }


}

module.exports = { User };