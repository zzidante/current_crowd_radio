
'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");

module.exports = (DataHelpers) => {
  // Login
  router.put('/', (req, res) => {
    DataHelpers.login(req.body.email, req.body.password).then( user => {
      if(user) {
        req.session.user_id = user.id;
        DataHelpers.getPlaylists(user.id).then( playlists => {
          req.session.playlists = playlists;
          res.status(200).json(req.session);
        });
      } else {
        res.sendStatus(401);
      }
    });
    // req.session.userId = "9234582345asdfa1"
    // res.json(req.session)
    // Return confirmation response
    // Redirect to dashboard
  });
  // Register
  router.post('/', (req, res) => {
    const { username, email, defaultLocation } = req.body
    const password = bcrypt.hashSync(req.body.password, 10);
    DataHelpers.registerUser({username: username, email: email, password_digest: password, default_location: defaultLocation})
      .then ( userId => {
        if(userId[0]) {
          req.session.user_id = userId[0];
          res.status(200).json(req.session);
        } else {
          res.sendStatus(401);
        }
      });
    // Return confrimation response
    // Redirect to dashboard
  });

  // Logout
  router.delete('/', (req, res) => {
    req.session = null;
    res.sendStatus(200);
    // Return confirmation response
    // Redirect to landing
  });

  // User profile
  router.get('/:id', (req, res) => {
    DataHelpers.getProfile(req.params.id).then ( user => {
      if(user) {
        res.status(200).json(user);
      } else {
        res.sendStatus(404);
      }
    });
    // Return user as json file
  });

  // Edit profile
  router.put('/:id', (req, res) => {
    const { username, email, location } = req.body
    const password = bcrypt.hashSync(req.body.password, 10);
    DataHelpers.editProfile(req.params.id, {username: username, email: email, password_digest: password, default_location: location})
      .then ( userId => {
        if(userId[0]) {
          req.session.user_id = userId[0];
          res.status(200).json(req.session);
        } else {
          res.sendStatus(401);
        }
      });
    // Return confirmation response
  });

  // Delete account
  router.delete('/:id', (req, res) => {
    DataHelpers.deleteUser(req.params.id, req.body.password).then( result => {
      if(result) {
        req.session = null;
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    });
    // Return confirmation response
    // Redirect to landing
  });

  return router
}