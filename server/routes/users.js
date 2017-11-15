
'use strict'

const express = require('express')
const router = express.Router()

module.exports = (DataHelpers) => {
  // Login
  router.put('/', (req, res) => {
    
  })
  // Register
  router.post('/', (req, res) => {
    
  })

  // Logout
  router.delete('/', (req, res) => {
    
  })

  // User profile
  router.get('/:id', (req, res) => {

  })

  // Edit profile
  router.put('/:id', (req, res) => {
    
  })

  // Delete account
  router.delete('/:id', (req, res) => {
    
  })

  return router
}