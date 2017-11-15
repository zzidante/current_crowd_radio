
'use strict'

const express = require('express')
const router = express.Router()
// Move knex to DataHelper.js

module.exports = (DataHelpers) => {
  // Dashboard - guest
  router.get('/:cityId', (req, res) => {

  })

  // Dashboard - logged in
  router.get('/:cityId/users/:id', (req, res) => {
  })

  // Add song to user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body
  })

  // Move song betweet user's playlist
  router.post('/:cityId/users/:id', (req, res) => {
    const { songId, type } = req.body
  })

  // Remove single song from user's playlist
  router.delete('/:cityId/users/:id', (req, res) => {

  })

  return router
}