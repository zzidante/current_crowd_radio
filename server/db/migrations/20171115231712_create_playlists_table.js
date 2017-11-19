
exports.up = function(knex, Promise) {
  return knex.schema.createTable('playlists', function (table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('type').notNullable();
      table.string('location').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('playlists');
};
