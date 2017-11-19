
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.unique('username');
      table.string('email').notNullable();
      table.unique('email');
      table.string('password_digest').notNullable();
      table.string('default_location').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
