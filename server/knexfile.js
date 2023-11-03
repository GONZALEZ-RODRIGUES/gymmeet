require("dotenv").config({
  path: "./.env.local",
});

module.exports = {
  client: "pg",
  connection: process.env.DB_URL || {
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
  },
  migrations: {
      directory: "./db/migrations",
  },
  seeds: {
      directory: "./db/seeds",
  }
};
