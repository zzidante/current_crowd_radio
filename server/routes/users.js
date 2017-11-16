
'use strict'

const express = require('express')
const router = express.Router()

module.exports = (DataHelpers) => {
  // Login
  router.put('/', (req, res) => {
    const { email, password } = req.body
    DataHelpers.login( email, password ).then ( result => {

    })
    // Return confirmation response
    // Redirect to dashboard
  })
  // Register
  router.post('/', (req, res) => {
    const { username, email, password, defaultLocation } = req.body
    DataHelpers.registerUser( username, email, password, defaultLocation ).then ( result => {
      
    })
    // Return confrimation response
    // Redirect to dashboard
  })

  // Logout
  router.delete('/', (req, res) => {
    session.clear()
    // Return confirmation response
    // Redirect to landing
  })

  // User profile
  router.get('/:id', (req, res) => {
    DataHelpers.getProfile( req.params.id ).then ( result => {

    })
    // Return user as json file
  })

  // Edit profile
  router.put('/:id', (req, res) => {
    DataHelpers.getProfile( req.params.id ).then ( result => {
      
    })
    // Return confirmation response
  })

  // Delete account
  router.delete('/:id', (req, res) => {
    DataHelpers.deleteUser( req.params.id ).then ( result => {
      
    })
    // Return confirmation response
    // Redirect to landing
  })

  return router
}