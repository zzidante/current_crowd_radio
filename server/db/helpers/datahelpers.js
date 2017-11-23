const bcrypt = require("bcrypt");

module.exports = function makeDataHelpers (knex) {
  return {
    // User functions

    // Returns user object if credentials are vaild
    // If credentials are not valid, returns null
    login: function (email, password) {
      console.log("DATAHELPER", email, password);
      return knex('users').where({email: email}).then( user => {
        console.log("FIND USER KNEX");
        if (user[0] && bcrypt.compareSync(password, user[0].password_digest)) {
          return user[0];
        }
        return null;
      });
    },

    // Returns promise to get all playlists for specified user after inserting new user
    // If user already exists, returns null
    registerUser: function (user) {
      return knex('users').where({email: user.email}).first().then( existing => {
        if (existing) {
          return null;
        }
        return knex('users').insert(user).returning('id');
      });
    },

    // Returns promise to delete user
    deleteUser: function (id, password) {
      return knex('users').where({id: id}).first().then( user => {
        if (user && bcrypt.compareSync(password, user.password_digest)) {
          return knex('users').where({id: id}).del();
        }
        return null;
      });
    },

    // Returns promise to get user
    getProfile: function (id) {
      console.log(id);
      return knex('users').where({id: id}).then( result => {
        return result[0];
      });
    },

    // Returns promise to update user with specified attributes
    editProfile: function (id, user) {
      return knex('users').where({id: id}).update(user).returning('id').then( userId => {
        return this.getProfile(userId[0]);
      }).catch(error => {
        console.log("Profile edit error: ", error.detail);
      });
    },

    editPassword: function(id, passwords) {
      return knex('users').where({id}).first().then( user => {
        if (bcrypt.compareSync(passwords.oldPassword, user.password_digest)) {
          const password = bcrypt.hashSync(passwords.newPassword, 10)
          return knex('users').where({id}).update({password_digest:password}).returning('id').then( userId => {
            return userId
          })
        } else {
          return "Passwords did not match"
        }
      }).catch(err => {
        console.log("Password edit error: ", error.details)
      })
    },


    // Playlist functions

    // Returns promise to insert new track, returning track_id
    // If track already exists, skips insert and returns track_id directly
    addTrack: function (hrefId) {
      return knex('tracks').where({href_id: hrefId}).first().then( track => {
        if (track) {
          return [track.id];
        }
        return knex('tracks').insert({href_id: hrefId}).returning('id');
      }).catch(error => {
        console.log("Track add error: ", error.detail);
      });
    },

    // Returns promise to get all playlists for specified user
    // If user does not exist, returns null
    getPlaylists: function (userId) {
      return knex('users').where({id: userId}).first().then( user => {
        if (user) {
          return knex('playlists').where({user_id: userId})
          .innerJoin('playlist_tracks', 'playlists.id', 'playlist_tracks.playlist_id')
          .innerJoin('tracks', 'playlist_tracks.track_id', 'tracks.id');
        }
        return null;
      }).then( playlistTracks => {
        const userPlaylists = {};
        playlistTracks.forEach( track => {
          const {location, type, href_id} = track;
          if(!userPlaylists[location]) {
            userPlaylists[location] = {};
          }
          if(!userPlaylists[location][type]) {
            userPlaylists[location][type] = [];
          }
          userPlaylists[location][type].push(href_id);
        });
        return userPlaylists;
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
            .returning('id')
        }).catch(error => {
          console.log("Playlist add error: ", error.detail);
          });
    },

    // Returns promise to get all playlists for specified user after deleting specified playlist
    deletePlaylist: function (playlistId, userId) {
      return knex('playlists').where({id: playlistId}).del().then( data => {
        return this.getPlaylists(userId);
      });
    },

    // Returns promise to get all playlists for specified user after inserting new track to playlist
    playlistTracksInsert: function (playlistId, songId) {
      return this.addTrack(songId).then( trackId => {
        return knex('playlist_tracks').insert({playlist_id: playlistId, track_id: trackId[0]})
          .returning('playlist_id').then( playlistId => {
            return knex('playlists').where({id: playlistId[0]}).then( playlist => {
              return this.getPlaylists(playlist[0].user_id);
            });
          }).catch(error => {
            console.log("Playlist Tracks Insert error: ", error.detail);
          });
      });
    },

    // Returns promise to insert new track to playlist
    // If playlist does not exist, inserts new playlist before returning same promise
    addSongToPlaylist: function (userId, type, location, songId) {
      return knex('playlists').where({user_id: userId, type: type, location: location})
        .then( playlistResult => {
          if (playlistResult[0]) {
            return this.playlistTracksInsert(playlistResult[0].id, songId);
          } else {

            // Create new playlist for user if none matching the supplied criteria exist
            return this.addPlaylist(userId, type, location).then( newPlaylist => {
              return this.playlistTracksInsert(newPlaylist[0], songId);
            });
          }
        });
    },

    // Returns promise to get all playlists for specified user after deleting track from playlist
    // If playlist does not exist, skips delete and returns same promise
    deleteSongFromPlaylist: function (userId, type, location, songId) {
      let playlistId = 0;
      let trackId = 0;
      // Query for track that matches songId
      return knex('tracks').where({href_id: songId}).then( trackResult => {
        if (trackResult[0]) {
          trackId = trackResult[0].id;
          
          // Query for playlist that matches user, type, location
          return knex('playlists').where({user_id: userId, type: type, location: location})
        }
      })
      .then( playlistResult => {
        if (playlistResult[0]) {
          playlistId = playlistResult[0].id;

          // Delete playlist track matching trackId and playlistId
          return knex('playlist_tracks').where({playlist_id: playlistId, track_id: trackId}).del()
        }
      }).then( data => {

        // Query for other tracks in same playlist
        return knex('playlist_tracks').where({playlist_id: playlistId}).first()
      }).then( playlistTracks => {
        if (!playlistTracks) {

          // Delete playlist if no other tracks are found
          return this.deletePlaylist(playlistId, userId);
        }
        return this.getPlaylists(userId);
      });
    },

    // Returns promise to delete track from playlistFrom after inserting track to playlistTo
    moveSongToPlaylist: function (userId, typeTo, typeFrom, location, songId) {
      return this.addSongToPlaylist(userId, typeTo, location, songId).then( data => {
        return this.deleteSongFromPlaylist(userId, typeFrom, location, songId);
      });
    }
  };
};
