'use strict'

// Load env vars
const envConfig = require('dotenv').config()
if (envConfig.error) throw envConfig.error;

// TODO: Install Babel for ES6
const express = require('express')

const spotify = require('./services/spotify')


// TODO: Install StandardJS linter
const app = express()

app.get('/', (req, res) => {
  spotify.requestAuth()
    .then(result => res.status(result.status).send(result.message))
    .catch(err => res.status(500).send(err.message))
})

app.get('/auth', (req, res) => {
  const { code, error, state } = req.query;
  spotify.verifyAuth(code, error, state)
    .then(result => res.status(result.status).send(result.message))
    .catch(err => res.status(500).send(err.message))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))