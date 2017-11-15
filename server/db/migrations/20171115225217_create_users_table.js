
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.string('email');
      table.string('password_digest');
      table.string('default_location');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
