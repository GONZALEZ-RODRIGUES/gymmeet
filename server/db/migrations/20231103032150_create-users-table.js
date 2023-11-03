/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name");
      table.string("last_name").notNullable();
      table.string("email").notNullable().unique();
      table.decimal("age");
      table.decimal("weight");
      table.decimal("height");
      table.string("gender").notNullable();
      table.text("goals");
      table.text("description");
      table.string("gym_attended");
      table.string("hashed_password").notNullable();
      table.string("salt").notNullable();
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };