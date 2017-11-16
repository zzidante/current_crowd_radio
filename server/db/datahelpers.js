const bcrypt = require("bcrypt");

module.exports = function makeDataHelpers (knex) {
  return {

    // User functions

    // Returns user object if credentials are vaild
    // If credentials are not valid, returns null
    login: function (email, password) {
      knex('users').where({email: email}).then( user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
    },

    // Returns promise to get all playlists for specified user after inserting new user
    // If user already exists, returns null
    registerUser: function (user) {
      knex('users').where({email: user.email}).then( existing => {
        if (existing) {
          return null;
        }
        knex('users').insert(user).returning('id').then( userId => {
          return getPlaylists(userId);
        });
      });
    },

    // Returns promise to delete user
    deleteUser: function (id) {
      return knex('users').where({id: id}).del;
    },

    // 
    getProfile: function (id) {
      return knex('users').where({id: id});
    },

    // 
    editProfile: function (user) {
      return knex('users').where({id: user.id}).update(user);
    },

    // Playlist functions

    // Returns promise to insert new track, returning track_id
    // If track already exists, skips insert and returns track_id directly
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

    // Returns promise to get all playlists for specified user after inserting new playlist
    // If playlist already exists, skips insert and returns same promise
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

    // Returns promise to get all playlists for specified user after inserting new track to playlist
    playlistTracksInsert: function (playlist, trackId) {
      knex('playlist_tracks').insert(playlist).returning('playlist_id').then( data => {
        return getPlaylists(playlist.user_id, playlist.location);
      });
    },

    // Returns promise to insert new track to playlist
    // If playlist does not exist, inserts new playlist before returning same promise
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

    // Returns promise to get all playlists for specified user after deleting track from playlist
    // If playlist does not exist, skips delete and returns same promise
    deleteSongFromPlaylist: function (playlist, trackId) {
      knex('playlists').where(playlist).then( playlistResult => {
        if (playlistResult) {
          return knex('playlist_tracks').where({track_id: trackId}).del().then( data => {
              return getPlaylists(playlist.user_id);
            });
        }
        return getPlaylists(playlist.user_id);
      });
    },

    // Returns promise to delete track from playlistFrom after inserting track to playlistTo
    moveSongToPlaylist: function (playlistTo, playlistFrom, trackId) {
      addSongToPlaylist(playlistTo, trackId).then( data => {
        return deleteSongFromPlaylist(playlistFrom, trackId);
      });
    }
  };
};
