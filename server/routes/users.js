'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");

function rnd(){
  return Math.random().toString(36).substr(2, 10)
}

module.exports = (DataHelpers) => {
  
  // Login
  router.put('/', (req, res) => {
    if (req.session.token && req.body.auth.token === req.session.token) {
      req.session.token = rnd()
      DataHelpers.getProfile(req.session.user_id).then ( user => {
        if(user) {
          return DataHelpers.getPlaylists(req.session.user_id).then( playlists => {
            res.status(200).json({playlists, token: req.session.token, user:{username: user.username, defaultLocation: user.default_location }});
            return
          })  
        }
      });
    } else {
      DataHelpers.login(req.body.auth.email, req.body.auth.password).then( user => {
        if(user) {
          req.session.user_id = user.id;
          req.session.token = rnd()
          DataHelpers.getPlaylists(user.id).then( playlists => {
            res.status(200).json({playlists, token: req.session.token, user:{username: user.username, defaultLocation: user.default_location }});
          });
        } else {
          res.sendStatus(401);
        }
      }).catch( err => {
        console.log(err);
      });
    }
  });

  // Register
  router.post('/', (req, res) => {
    const { username, email, defaultLocation } = req.body
    const password = bcrypt.hashSync(req.body.password, 10);
    DataHelpers.registerUser({username: username, email: email, password_digest: password, default_location: defaultLocation})
      .then ( userId => {
        if( userId && userId[0]) {
          req.session.user_id = userId[0];
          req.session.token = rnd()
          res.status(200).json({token: req.session.token});
        } else {
          res.sendStatus(401);
        }
      });
  });

  router.use('/:id', (req, res, next) => {
    if (req.params.id === req.session.token ) {
      next()
      return
    }
    res.sendStatus(401)
  })

  // Logout
  router.delete('/', (req, res) => {
    req.session = null;
    res.sendStatus(200);
  });

  // User profile
  router.get('/:id', (req, res) => {
    DataHelpers.getProfile(req.session.user_id).then ( user => {
      if(user) {
        res.status(200).json({user: {username: user.username, email: user.email, defaultLocation: user.default_location}});
      } else {
        res.sendStatus(404);
      }
    });
  });

  // Edit profile
  router.put('/:id', (req, res) => {
    const { username, email, defaultLocation } = req.body.data;
    DataHelpers.editProfile(req.session.user_id, {username, email, default_location: defaultLocation})
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
    DataHelpers.editPassword(req.session.user_id, { oldPassword, newPassword}).then( userId => {
      if(userId[0]) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    })
  });

  // Delete account
  router.delete('/:id', (req, res) => {
    DataHelpers.deleteUser(req.session.user_id, req.body.password).then( result => {
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