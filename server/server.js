'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);

if(ENV !== 'production') {
  const morgan = require('morgan');
  const knexLogger = require('knex-logger');
  
  // HTTP Logger
  app.use(morgan('dev'));
  
  // Log knex SQL queries to STDOUT as well
  app.use(knexLogger(knex));
}

// Helper functions that communicate with DB
const DataHelpers = require('./db/helpers/datahelpers.js')(knex);

// Seperated Routes for each Resource
const playlistsRoutes = require('./routes/playlists')(DataHelpers);
const usersRoutes = require('./routes/users.js')(DataHelpers);


app.use(cookieSession({
  name: 'session',
  keys: ['secretOne', 'secretTwo'],
  maxAge: 24 * 60 *60 * 1000
}));
app.use(bodyParser.json());
app.use(express.static("../client/build/"));

app.use(cors());
app.use('/playlists/', playlistsRoutes);
app.use('/users', usersRoutes);

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
});
