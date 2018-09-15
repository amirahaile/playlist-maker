'use strict'

// Load env vars
const envConfig = require('dotenv').config()
if (envConfig.error) throw envConfig.error;

// TODO: Install Babel for ES6
const express = require('express')
const winston = require('winston')

const C = require('./utils/constants');
const spotifyAuth = require('./services/spotify-auth')


// TODO: Install StandardJS linter
const app = express()

app.get('/', (req, res) => {
  const url = spotifyAuth.buildAuthQuery()  
  winston.debug(`Redirecting response to ${url}`)
  res.redirect(url)
})

app.get('/auth', (req, res) => {
  const { code, error, state } = req.query
  spotifyAuth.getAuthTokens(code, error, state)
    .then(tokens => { 
      res.status(200).send(tokens)
    })
    .catch(err => {
      winston.error(err.message)
      res.status(500).send(err.message)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))