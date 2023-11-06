/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("meets", (table) => {
    table.increments("meet_id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id")
    table.string("meet_description");
    table.string("meet_local");
    table.date("meet_date");
    table.time("meet_time");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("meets");
};