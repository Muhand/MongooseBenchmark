'use strict'
const mongoose = require('mongoose')
const helpers = require('./helperMethods')
const deactiveAfterDays = 4

let testSchema = mongoose.Schema({
    createdAt:{
      type: Date,
      required: true,
      default: Date.now,
      index: true
    },

    expire:{
      type: Date,
      required: true,
      // By default expire after 1 day
      default: +new Date() + 1*24*60*60*1000,
      index: true
    },

    isActive:{
      type: Boolean,
      required: true,
      default: true,
      index: true
    }
})

// If compound index is needed
// testSchema.index({createdAt: 1, expire: 1})
// testSchema.index({isActive: 1, expire: 1})

// Hooks
testSchema.pre("save", function (next) {
  // Randomly get between 1 and 7 days - the model will expire by default after
  // those days
  var expireAfterDays = helpers.getRandomInt(1,7)

  // Before saving(creating) a new document generate a random expiration date for it
  // and set its isActive property
  this.expire = +new Date() + expireAfterDays*(24*60*60*1000),

  // If expireAfterDays is larger than deeactiveAfterDays then set isActive
  // to false, since by deafult this should have been 'expired'
  // otherwise set it it true, still did not expire
  this.isActive = expireAfterDays >= deactiveAfterDays ? false : true
  next()
})

// testSchema.pre('find', (next) => {
//
// })
//
// testSchema.post('find', (next) => {
//
// })


module.exports = mongoose.model('Test', testSchema)
