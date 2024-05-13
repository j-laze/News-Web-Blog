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
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );
`;

const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS comments (
        comment_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        status VARCHAR(50),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
`;

async function initializeDB() {
  try {
    await client.connect();
    await client.query(createUsersTable);
    await client.query(createCommentsTable);
    console.log("User and Comment tables created successfully");
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
}

module.exports = { initializeDB };
