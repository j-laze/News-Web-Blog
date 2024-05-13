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

async function initalizeDB() {
  await client.connect();
  await client.query(createUsersTable, (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
      console.log("Table created successfully");
    }
  });
}

module.exports = { client, initalizeDB };
