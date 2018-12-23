'use strict'

const http = require('http')
const express = require('express')
const initializeDb = require('./db')

// Initialize the server
let app = express()
let api = express.Router()

app.server = http.createServer(app)


/**
 * This EP will generate random documents on the db
 * @type {Endpoint}
 */
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
  res.send('Not Found')
});

// Initialize db
initializeDb()
  .then(
    () => {
      // If db was initialized successfully then start the server
      app.server.listen(process.env.PORT || 3000, err => {
        err ? () => {throw err} : console.log(`Server Started`)
      });
    }
  )
  .catch(err => { console.log('Failed to start server\n'); throw err })

module.exports = app;
