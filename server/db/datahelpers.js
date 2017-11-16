const bcrypt = require("bcrypt");

module.exports = function makeDataHelpers (knex) {
  return {

    // User functions

    // Login function
    // Returns user object if email and password are vaild
    login: function (email, password) {
      knex('users').where({email: email}).then( user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
    },

    // Register function
    // Returns 
    registerUser: function (user) {
      knex('users').where({email: user.email}).then( existing => {
        if (existing) {
          return null;
        }
        knex('users').insert(user).returning(['id', 'default_location']).then( registered => {
          return getPlaylists(registered[0].id, registered[0].default_location);
        });
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

    // Returns promise to insert new track to db, returning track_id
    // If track already exists in db, skips insert and returns track_id directly
    addTrack: function (hrefId) {
      knex('tracks').where({href_id: hrefId}).then( track => {
        if (track) {
          return track.id;
        }
        return knex('tracks').insert({href_id: hrefId}).returning('id');
      });
    },

    // Returns promise to get all playlists for specified user
    // If user does not exist, returns null
    getPlaylists: function (userId) {
      knex('users').where({id: userId}).then( user => {
        if (user) {
          return knex('playlists').where({user_id: userId});
        }
        return null;
      });
    },

    // Returns promise to get all playlists for specified user after inserting new playlist to db
    // If playlist already exists in db, skips insert and returns same promise
    addPlaylist: function (playlist) {
      knex('playlists').where(playlist).then( playlistResult => {
        if (playlistResult) {
          return getPlaylists(playlistResult.user_id);
        }
        knex('playlists').insert(playlist).returning('user_id').then( userId => {
          return getPlaylists(userId);
        });
      });
    },

    // Returns promise to get all playlists for specified user after inserting new track to playlist in db
    playlistTracksInsert: function (playlist, trackId) {
      knex('playlist_tracks').insert(playlist).returning('playlist_id').then( data => {
        return getPlaylists(playlist.user_id, playlist.location);
      });
    },

    //
    addSongToPlaylist: function (playlist, trackId) {
      knex('playlists').where(playlist).then( playlistResult => {
        if (playlistResult) {
          return playlistTracksInsert(playlistResult, trackId);
        } else {
          addPlaylist(playlist.user_id, playlist.type, playlist.location).then( newPlaylist => {
            return playlistTracksInsert(newPlaylist, trackId);
          });
        }
        return null;
      });
    },
    deleteSongFromPlaylist: function (playlist_id, track_id) {
      knex('playlists').where({id: playlist_id}).then( playlist => {
        if (playlist) {
          return knex('playlist_tracks').insert({playlist_id: playlist.id, track_id: track_id}).returning('playlist_id');
        }
        return null;
      });
    },
    moveSongToPlaylist: function (playlist_id_to, playlist_id_from, track_id) {
      addSongToPlaylist(playlist_id_to, track_id).then( data => {
        return deleteSongFromPlaylist(playlist_id_from, track_id);
      });
    }
  };
};
