'use strict'

const http = require('http')
const express = require('express')

// Initialize the server
let app = express()
let api = express.Router()
app.server = http.createServer(app)


app.get('/generate/:numberOfDocs?', (req, res) => {
  let docs = req.params.numberOfDocs

  // If numberOfDocs was passed then set docs to be that number
  // otherwise default to 100
  docs = docs ? docs : 100

  res.status(200)
  res.send('Hello World');
})

// Catch 404
app.use( (req, res) => {
  res.status(404)
  res.send('Not Found').status(404)
});

// Setup the server port
var port = 3000

app.server.listen(port, err => {
  err ? () => {throw err} : console.log(`Server Started`)
});

module.exports = app;
