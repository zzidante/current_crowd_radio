
'use strict'

const express = require('express')
const router = express.Router()
// Move knex to DataHelper.js

module.exports = (DataHelpers) => {
  // Dashboard - guest
  router.get('/:cityId', (req, res) => {
    // Display dashboard
    // Return nothing
  })

  // Dashboard - logged in
  router.get('/:cityId/users/:id', (req, res) => {

    // Return json playlists 'current', 'archived' for each location user has saved
  })

  // Add song to user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body

    // Return confirmation response
  })

  // Move song betweet user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body

    // Return confirmation response
  })

  // Remove single song from user's playlist
  router.delete('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body

    // Remove confirmation response
  })

  return router
}