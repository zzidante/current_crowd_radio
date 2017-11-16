
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playlists').del()
    .then(() => {
      // Query user ids to pass to playlists
      return knex('users').select('id').orderBy('id');
    })
    .then((queryResult) => {
      // Inserts seed entries
      return knex('playlists').insert([
        {user_id: queryResult[0].id, type: 'current', location:'1038'},
        {user_id: queryResult[0].id, type: 'archive', location:'1038'},
        {user_id: queryResult[1].id, type: 'current', location:'1038'},
        {user_id: queryResult[1].id, type: 'archive', location:'1038'}
      ]);
    });
};
