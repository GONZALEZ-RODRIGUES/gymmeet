<<<<<<< HEAD
const knexConfig = require("../knexfile");
const knex = require("knex");
=======
const config = require("../knexfile");
const knex = require("knex");

>>>>>>> auth

const environment = process.env.NODE_ENV === "production" ? "production" : "development"

module.exports = knex(knexConfig[environment]);