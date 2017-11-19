
'use strict'

const express = require('express')
const router = express.Router()
// Move knex to DataHelper.js

module.exports = (DataHelpers) => {
  // Dashboard
  router.get('/:cityId/users/:id', (req, res) => {
    DataHelpers.getPlaylists(user.id).then( playlists => {
      req.session.playlists = playlists;
      res.status(200).json(req.session);
    });
    // Return json playlists 'current', 'archived' for each location user has saved
  })

  // Add song to user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body
    DataHelpers.addSongToPlaylist(req.params.id, type, req.params.cityId, songId).then( userPlaylists => {
      req.session.playlists = userPlaylists;
      res.status(200).json(req.session);
    });
    // Return confirmation response
  });

  // Move song betweet user's playlist
  router.put('/:cityId/users/:id', (req, res) => {
    const { songId, typeFrom, typeTo } = req.body
    DataHelpers.moveSongToPlaylist(req.params.id, typeTo, typeFrom, req.params.cityId, songId).then( userPlaylists => {
      req.session.playlists = userPlaylists;
      res.status(200).json(req.session);
    })
    // Return confirmation response
  })

  // Remove single song from user's playlist
  router.delete('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body
    DataHelpers.deleteSongFromPlaylist(req.params.id, type, req.params.cityId, songId).then( userPlaylists => {
      req.session.playlists = userPlaylists;
      res.status(200).json(req.session);
    })
    // Remove confirmation response
  })

  return router
}