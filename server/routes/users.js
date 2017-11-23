'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");

module.exports = (DataHelpers) => {
  
  // Login
  router.put('/', (req, res) => {
    DataHelpers.login(req.body.auth.email, req.body.auth.password).then( user => {
      if(user) {
        req.session.user_id = user.id;
        DataHelpers.getPlaylists(user.id).then( playlists => {
          res.status(200).json({playlists, user:{ id: user.id, username: user.username, defaultLocation: user.default_location }});
        });
      } else {
        res.sendStatus(401);
      }
    }).catch( err => {
      console.log(err);
    });
  });

  // Register
  router.post('/', (req, res) => {
    const { username, email, defaultLocation } = req.body
    const password = bcrypt.hashSync(req.body.password, 10);
    DataHelpers.registerUser({username: username, email: email, password_digest: password, default_location: defaultLocation})
      .then ( userId => {
        if( userId && userId[0]) {
          req.session.user_id = userId[0];
          res.status(200).json({userId: userId[0]});
        } else {
          res.sendStatus(401);
        }
      });
  });

  router.use('/:id', (req, res, next) => {
    if (Number(req.params.id) !== req.session.user_id ) {
      res.sendStatus(401)
      return
    }
    next()
  })

  // Logout
  router.delete('/', (req, res) => {
    req.session = null;
    res.sendStatus(200);
  });

  // User profile
  router.get('/:id', (req, res) => {
    DataHelpers.getProfile(req.params.id).then ( user => {
      if(user) {
        res.status(200).json({user: {id: user.id, username: user.username, email: user.email, defaultLocation: user.default_location}});
      } else {
        res.sendStatus(404);
      }
    });
  });

  // Edit profile
  router.put('/:id', (req, res) => {
    const { username, email, defaultLocation } = req.body.data;
    DataHelpers.editProfile(req.params.id, {username, email, default_location: defaultLocation})
      .then ( user => {
        if(user) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      });
  });

  // Edit password
  router.put('/:id/password/', (req, res) => {
    const { oldPassword, newPassword } = req.body.data;
    DataHelpers.editPassword(req.params.id, { oldPassword, newPassword}).then( userId => {
      if(userId[0]) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    })
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
