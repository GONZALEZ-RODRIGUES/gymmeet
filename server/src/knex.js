const knexConfig = require("../knexfile");
const knex = require("knex");

const environment = process.env.NODE_ENV === "production" ? "production" : "development"

module.exports = knex(knexConfig[environment]);