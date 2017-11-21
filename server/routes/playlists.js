'use strict'

const express = require('express')
const router = express.Router()

module.exports = (DataHelpers) => {
  
  // Dashboard
  router.get('/:cityId/users/:id', (req, res) => {
    DataHelpers.getPlaylists(user.id).then( userPlaylists => {
      res.status(200).json(userPlaylists);
    });
  });

  // Add song to user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { id, cityId } = req.params;
    const { songId, type } = req.body;

    DataHelpers.addSongToPlaylist(id, type, cityId, songId).then( userPlaylists => {
      res.status(200).json(userPlaylists);
    });
  });

  // Move song between user's playlists
  router.put('/:cityId/users/:id', (req, res) => {
    const { id, cityId } = req.params;
    const { songId, typeFrom, typeTo } = req.body;
    DataHelpers.moveSongToPlaylist(id, typeTo, typeFrom, cityId, songId).then( userPlaylists => {
      res.status(200).json(userPlaylists);
    });
  });

  // Remove single song from user's playlist
  router.delete('/:cityId/users/:id', (req, res) => {
    const { id, cityId} = req.params;
    const { songId, type } = req.query;
    DataHelpers.deleteSongFromPlaylist(id, type, cityId, songId).then( userPlaylists => {
      res.status(200).json(userPlaylists);
    });
  });

  return router;
}
