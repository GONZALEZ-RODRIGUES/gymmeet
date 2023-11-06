/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('meet_participants', function (table) {
      table.increments('participant_id').primary();
      table.integer('meet_id').references('meets.meet_id');
      table.integer('user_id').references('users.id');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('meet_participants');
  };
  