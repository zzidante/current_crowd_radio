
'use strict'

const express = require('express')
const router = express.Router()

module.exports = (DataHelpers) => {
  // Login
  router.put('/', (req, res) => {
    
    // Return confirmation response
    // Redirect to dashboard
  })
  // Register
  router.post('/', (req, res) => {
    
    // Return confrimation response
    // Redirect to dashboard
  })

  // Logout
  router.delete('/', (req, res) => {

    // Return confirmation response
    // Redirect to landing
  })

  // User profile
  router.get('/:id', (req, res) => {

    // Return user as json file
  })

  // Edit profile
  router.put('/:id', (req, res) => {
    
    // Return confirmation response
  })

  // Delete account
  router.delete('/:id', (req, res) => {
    
    // Return confirmation response
    // Redirect to landing
  })

  return router
}