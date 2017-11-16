
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playlist_tracks').del()
    .then(() => {
      // Query playlist and track ids to pass to playlist_tracks
      return Promise.all([
        knex('playlists').select('id').orderBy('id'),
        knex('tracks').select('id').orderBy('id')
      ]);
    })
    .then((queryResult) => {
      // Inserts seed entries
      return knex('playlist_tracks').insert([
        {playlist_id: queryResult[0][0].id, track_id: queryResult[1][0].id},
        {playlist_id: queryResult[0][0].id, track_id: queryResult[1][1].id},
        {playlist_id: queryResult[0][0].id, track_id: queryResult[1][2].id},
        {playlist_id: queryResult[0][2].id, track_id: queryResult[1][0].id},
        {playlist_id: queryResult[0][2].id, track_id: queryResult[1][1].id},
        {playlist_id: queryResult[0][3].id, track_id: queryResult[1][2].id}
      ]);
    });
};
