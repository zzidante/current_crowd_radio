const bcrypt = require("bcrypt");

module.exports = function makeDataHelpers (knex) {
  return {
    // User functions
    login: function (email, password) {
      knex('users').where({email: email}).then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
    },
    registerUser: function (user) {
      knex('users').where({email: user.email}).then((existing) => {
        if (existing) {
          return null;
        }
        return knex('users').insert(user).returning('id');
      });
    },
    deleteUser: function (id) {
      return knex('users').where({id: id}).del;
    },
    getProfile: function (id) {
      return knex('users').where({id: id});
    },
    editProfile: function (user) {
      return knex('users').where({id: user.id}).update(user);
    },

    // Playlist functions
    getPlaylists: function (user_id, location_id) {
      knex('users').where({id: user_id}).then((user) => {
        if (user) {
          return knex('playlists').where({user_id: user_id, location: location_id});
        }
        return null;
      });
    },
    addSongToPlaylist: function (playlist_id, track_id) {
      knex('playlists').where({id: playlist_id}).then((playlist) => {
        return knex('playlist_tracks').insert({playlist_id: playlist.id, track_id: track_id}).returning('playlist_id');
      });
    },
    deleteSongFromPlaylist: function (playlist_id, track_id) {
      knex('playlists').where({id: playlist_id}).then((playlist) => {
        return knex('playlist_tracks').insert({playlist_id: playlist.id, track_id: track_id}).returning('playlist_id');
      });
    },
    moveSongToPlaylist: function (playlist_id_to, playlist_id_from, track_id) {
      addSongToPlaylist(playlist_id_to, track_id);
      deleteSongFromPlaylist(playlist_id_from, track_id);
    }
  };
};
