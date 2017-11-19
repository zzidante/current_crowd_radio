
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tracks', function (table) {
      table.increments('id').primary();
      table.string('href_id').notNullable();
      table.unique('href_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tracks');
};
