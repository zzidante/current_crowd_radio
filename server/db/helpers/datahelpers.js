const bcrypt = require("bcrypt");

module.exports = function makeDataHelpers (knex) {
  return {
    // User functions

    // Returns user object if credentials are vaild
    // If credentials are not valid, returns null
    login: function (email, password) {
      return knex('users').where({email: email}).then( user => {
        if (user[0] && bcrypt.compareSync(password, user[0].password_digest)) {
          return user[0];
        }
        return null;
      });
    },

    // Returns promise to get all playlists for specified user after inserting new user
    // If user already exists, returns null
    registerUser: function (user) {
      return knex('users').where({email: user.email}).then( existing => {
        if (existing[0]) {
          return null;
        }
        knex('users').insert(user).returning('id').then( userId => {
          return this.getPlaylists(userId[0]);
        });
      });
    },

    // Returns promise to delete user
    deleteUser: function (id) {
      return knex('users').where({id: id}).del().then( result => {
        return result;
      });
    },

    // Returns promise to get user
    getProfile: function (id) {
      return knex('users').where({id: id}).then( result => {
        return result[0];
      });
    },

    // Returns promise to update user with specified attributes
    editProfile: function (id, user) {
      return knex('users').where({id: id}).update(user).returning('id').then( userId => {
        return userId;
      }).catch(error => {
        console.log("Profile edit error: ", error.detail);
      });
    },



    // Playlist functions

    // Returns promise to insert new track, returning track_id
    // If track already exists, skips insert and returns track_id directly
    addTrack: function (hrefId) {
      return knex('tracks').where({href_id: hrefId}).then( track => {
        if (track[0]) {
          return track[0].id;
        }
        return knex('tracks').insert({href_id: hrefId}).returning('id');
      }).catch(error => {
        console.log("Track add error: ", error.detail);
      });
    },

    // Returns promise to get all playlists for specified user
    // If user does not exist, returns null
    getPlaylists: function (userId) {
      return knex('users').where({id: userId}).then( user => {
        if (user[0]) {
          return knex('playlists').where({user_id: userId});
        }
        return null;
      });
    },

    // Returns promise to get all playlists for specified user after inserting new playlist
    // If playlist already exists, skips insert and returns same promise
    addPlaylist: function (userId, type, location) {
      return knex('playlists').where({user_id: userId, type: type, location: location})
        .then( playlistResult => {
          if (playlistResult[0]) {
            return this.getPlaylists(playlistResult[0].user_id);
          }
          return knex('playlists').insert({user_id: userId, type: type, location: location})
            .returning('user_id').then( userId => {
              return this.getPlaylists(userId[0]);
            }).catch(error => {
              console.log("Playlist add error: ", error.detail);
            });;
        });
    },

    // Returns promise to get all playlists for specified user after inserting new track to playlist
    playlistTracksInsert: function (playlistId, trackId) {
      return knex('playlist_tracks').insert({playlist_id: playlistId, track_id: trackId})
        .returning('playlist_id').then( playlistId => {
          return knex('playlists').where({id: playlistId[0]}).then( playlist => {
            return this.getPlaylists(playlist[0].user_id);
          });
        }).catch(error => {
          console.log("Playlist Tracks Insert error: ", error.detail);
        });;
    },

    // Returns promise to insert new track to playlist
    // If playlist does not exist, inserts new playlist before returning same promise
    addSongToPlaylist: function (playlist, trackId) {
      return knex('playlists').where(playlist).then( playlistResult => {
        if (playlistResult) {
          return playlistTracksInsert(playlistResult, trackId);
        } else {
          return addPlaylist(playlist.user_id, playlist.type, playlist.location).then( newPlaylist => {
            return playlistTracksInsert(newPlaylist, trackId);
          });
        }
      });
    },

    // Returns promise to get all playlists for specified user after deleting track from playlist
    // If playlist does not exist, skips delete and returns same promise
    deleteSongFromPlaylist: function (playlist, trackId) {
      return knex('playlists').where(playlist).then( playlistResult => {
        if (playlistResult) {
          return knex('playlist_tracks').where({track_id: trackId}).del().then( data => {
              return this.getPlaylists(playlist.user_id);
            });
        }
        return this.getPlaylists(playlist.user_id);
      });
    },

    // Returns promise to delete track from playlistFrom after inserting track to playlistTo
    moveSongToPlaylist: function (playlistTo, playlistFrom, trackId) {
      return addSongToPlaylist(playlistTo, trackId).then( data => {
        return deleteSongFromPlaylist(playlistFrom, trackId);
      });
    }
  };
};
