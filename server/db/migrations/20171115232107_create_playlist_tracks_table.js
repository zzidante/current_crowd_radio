
exports.up = function(knex, Promise) {
  return knex.schema.createTable('playlist_tracks', function (table) {
    table.unique(['playlist_id', 'track_id']);
    table.integer('playlist_id').references('id').inTable('playlists').onDelete('CASCADE');
    table.integer('track_id').references('id').inTable('tracks').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('playlist_tracks');
};
