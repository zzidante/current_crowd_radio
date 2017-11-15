'use strict';

require('dotenv').config()

const PORT = process.env.PORT || 8081
const ENV = process.env.ENV || 'development';
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig[ENV])
const morgan = require('morgan')
const knexLogger = require('knex-logger')

const DataHelpers = require('./db/datahelpers.js')(knex)

// Seperated Routes for each Resource
const playlistsRoutes = require('./routes/playlists')(DataHelpers)
const usersRoutes = require('./routes/users.js')(DataHelpers)

// HTTP Logger
app.use(morgan('dev'))

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("../client/public"));

app.use('/playlists/', playlistsRoutes)
app.use('/users', usersRoutes)

app.get("/", (req, res) => {

});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
})