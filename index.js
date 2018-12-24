'use strict'

const http = require('http')
const express = require('express')
const initializeDb = require('./db')
const async = require('async')
const Test = require('./testModel')

// Initialize the server
let app = express()
let api = express.Router()

app.server = http.createServer(app)

// console.log(helpers);
/**
 * This EP will generate random documents on the db
 * @type {Endpoint}
 */
app.get('/generate/:numberOfDocs?', (req, res) => {
  let docs = req.params.numberOfDocs

  // If numberOfDocs was passed then set docs to be that number
  // otherwise default to 100
  docs = docs ? docs : 100
  var start = new Date();

  // let promises = []
  var functions = []

  for (var i = 0; i < docs; i++) {
    let t = new Test()
    functions.push((callback) => {
      t.save(err => err ? callback(err) : callback(null))
    })
    // promises.push(t.save())
  }

  async.parallel(functions, (err) => {
    var end = new Date() - start
    err ? res.status(500) : res.status(200)
    res.writeHead(res.status, {'Content-Type':'application/json'});
    res.end(JSON.stringify({Message:`It took ${end}ms to generate ${docs} documents`, Error:err}));
  })

  // Promise.all(promises)
  //   .then(() => {
  //     var end = new Date() - start
  //     console.log(`It took ${end}ms to generate ${docs} documents`);
  //     res.status(200)
  //     res.send(`It took ${end}ms to generate ${docs} documents`)
  //   })
  //   .catch(err => {
  //     console.log(`THERE WAS AN ERROR`);
  //     console.log(`It took ${end}ms to generate ${docs} documents`);
  //     console.log(`-----------------------------------------------`);
  //     res.status(500)
  //     res.send(err)
  //   })
})

// Catch 404
app.use( (req, res) => {
  res.status(404)
  res.send('Not Found')
})

// Initialize db
initializeDb()
  .then(
    () => {
      // If db was initialized successfully then start the server
      app.server.listen(process.env.PORT || 3000, err => {
        err ? () => {throw err} : console.log(`Server Started`)
      })
    }
  )
  .catch(err => { console.log('Failed to start server\n'); throw err })

module.exports = app
