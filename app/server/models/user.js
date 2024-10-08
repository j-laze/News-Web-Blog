const { client: database } = require("../database/initalizeDB.js");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();

class User {
  static async hash(item_to_hash) {
    return await bcrypt.hash(item_to_hash, 10);
  }

  static async getAllPosts() {
    const query = `
            SELECT * FROM posts
            ORDER BY created_at
        `;
    try {
      const result = await database.query(query);
      //console.log(result.rows);

      return result.rows;
    } catch (error) {
      console.error(error);
    }
  }

  static async getUserPosts(user_id) {
    const query = `
            SELECT * FROM posts
            WHERE user_id = $1
            ORDER BY created_at
    `;
    try {
      const result = await database.query(query, [user_id]);

      return result.rows;
    } catch (error) {
      console.error(error);
    }
  }

  static async createPost(user_id, title, content) {
    const post_id = await uuidv4();
    const timestamp = new Date().toLocaleString();
    const query = `
            INSERT INTO posts (post_id, user_id, title, content, created_at)
            VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [post_id, user_id, title, content, timestamp];

    try {
      await database.query(query, values);
    } catch (error) {
      console.error(error);
      throw new Error("Error creating post");
    }
  }

  static async create({ username, password, email, res }) {
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
      res.redirect("/register");
      return;
    }
    res.redirect("/login");
  }

  static async loginCheck(users_email, password, res, req) {
    console.log(users_email, password);
    const query = `
        SELECT * FROM users
        WHERE email = $1`;
    try {
      const result = await database.query(query, [users_email]);
      const user = result.rows[0];
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Password incorrect");
      }
      const token = await User.createUsertoken(user.user_id, req);
      await User.sendCookie(token, res);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error logging in");
    }

    let cookie = req.cookies;
    console.log(cookie);
  }
  static async sendCookie(token, res) {
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 1000 * 60 * 60,
      path: "/",
    });
  }

  static async createUsertoken(user_id, req) {
    let ipaddress = req.connection.remoteAddress;
    let payload = { user_id, ipaddress };
    return jwt.sign(payload, process.env.jwt_secret, { expiresIn: "1h" });
  }
}

module.exports = { User };
