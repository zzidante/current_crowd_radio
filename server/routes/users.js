'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");

module.exports = (DataHelpers) => {
  
  // Login
  router.put('/', (req, res) => {
    console.log(req.body);
    DataHelpers.login(req.body.email, req.body.password).then( user => {
      if(user) {
        req.session.user_id = user.id;
        DataHelpers.getPlaylists(user.id).then( playlists => {
          res.status(200).json({playlists, user});
        });
      } else {
        res.sendStatus(401);
      }
    });
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
  });

  // Logout
  router.delete('/', (req, res) => {
    req.session = null;
    res.sendStatus(200);
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
  });

  return router;
}
