'use strict'

const express = require('express')
const router = express.Router()

module.exports = (DataHelpers) => {

  // Add song to user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { cityId } = req.params;
    const { songId, type } = req.body;

    DataHelpers.addSongToPlaylist(req.session.user_id, type, cityId, songId).then( userPlaylists => {
      res.status(200).json(userPlaylists);
    });
  });

  // Move song between user's playlists
  router.put('/:cityId/users/:id', (req, res) => {
    const { cityId } = req.params;
    const { songId, typeFrom, typeTo } = req.body;
    DataHelpers.moveSongToPlaylist(req.session.user_id, typeTo, typeFrom, cityId, songId).then( userPlaylists => {
      res.status(200).json(userPlaylists);
    });
  });

  // Remove single song from user's playlist
  router.delete('/:cityId/users/:id', (req, res) => {
    const { cityId } = req.params;
    const { songId, type } = req.query;
    DataHelpers.deleteSongFromPlaylist(req.session.user_id, type, cityId, songId).then( userPlaylists => {
      res.status(200).json(userPlaylists);
    });
  });

  return router;
}
