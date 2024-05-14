const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "news_blog",
  password: "postgres123",
  port: 5432,
});

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );
`;

const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
        post_id SERIAL PRIMARY KEY,
        user_id VARCHAR(36),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
`;

async function initializeDB() {
  try {
    await client.connect();
    await client.query(createUsersTable);
    console.log("Users table created successfully");
    await client.query(createPostsTable);
    console.log("Posts table created successfully");
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
}

module.exports = { client, initializeDB };
