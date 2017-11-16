
'use strict'

const express = require('express')
const router = express.Router()
// Move knex to DataHelper.js

module.exports = (DataHelpers) => {
  // Dashboard - guest
  router.get('/:cityId', (req, res) => {
    DataHelpers.getPlaylists(req.params.cityId).then( results => {

    })
    // Display dashboard
    // Return nothing
  })

  // Dashboard - logged in
  router.get('/:cityId/users/:id', (req, res) => {
    DataHelpers.getPlaylists(req.params.cityId, req.params.id).then( results => {
      
    })
    // Return json playlists 'current', 'archived' for each location user has saved
  })

  // Add song to user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body
    DataHelpers.addSongToPlaylist(req.params.cityId, req.params.id, songId, type).then( results => {
      
    })
    // Return confirmation response
  })

  // Move song betweet user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body
    DataHelpers.moveSongToPlaylist(req.params.cityId, req.params.id, songId, type).then( results => {
      
    })
    // Return confirmation response
  })

  // Remove single song from user's playlist
  router.delete('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body
    DataHelpers.deleteSongFromPlaylist(req.params.cityId, req.params.id, songId, type).then( results => {
      
    })
    // Remove confirmation response
  })

  return router
}