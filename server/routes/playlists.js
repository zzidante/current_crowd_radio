'use strict'

const express = require('express')
const router = express.Router()

module.exports = (DataHelpers) => {
  
  // Dashboard
  router.get('/:cityId/users/:id', (req, res) => {
    DataHelpers.getPlaylists(user.id).then( userPlaylists => {
      req.session.playlists = userPlaylists;
      res.status(200).json(req.session);
    });
  });

  // Add song to user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { id, cityId } = req.params;
    const { songId, type } = req.body;
    console.log(req.body);
    console.log(id, cityId, songId, type);
    DataHelpers.addSongToPlaylist(id, type, cityId, songId).then( userPlaylists => {
      req.session.playlists = userPlaylists;
      res.status(200).json(req.session);
    });
  });

  // Move song between user's playlists
  router.put('/:cityId/users/:id', (req, res) => {
    const { id, cityId } = req.params;
    const { songId, typeFrom, typeTo } = req.body;
    DataHelpers.moveSongToPlaylist(id, typeTo, typeFrom, cityId, songId).then( userPlaylists => {
      req.session.playlists = userPlaylists;
      res.status(200).json(req.session);
    });
  });

  // Remove single song from user's playlist
  router.delete('/:cityId/users/:id', (req, res) => {
    const { id, cityId } = req.params;
    const { songId, type } = req.body;
    DataHelpers.deleteSongFromPlaylist(id, type, cityId, songId).then( userPlaylists => {
      req.session.playlists = userPlaylists;
      res.status(200).json(req.session);
    });
  });

  return router;
}
