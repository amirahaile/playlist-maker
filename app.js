'use strict'

// TODO: Install Babel for ES6
const express = require('express')

// TODO: Install StandardJS linter
const app = express()

app.get('/', (req, res) => res.send('Hello World, it\'s me Margaret!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))