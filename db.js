'use strict';

const mongoose = require('mongoose')

const initialize = () =>
  new Promise(
    (resolve, reject) => {
      mongoose.Promise = global.Promise;

      let dbURL = `mongodb://test:test@localhost:27017/benchmarking`;

      const options = {
        //Refer to http://mongoosejs.com/docs/connections.html#use-mongo-client for more info on options
        useNewUrlParser: true
      }

      mongoose.connect(dbURL, options)
        .then(
          ()=>{
            resolve();
          },
          err=>{
            reject(new Error(err));
            // throw err;
          }
        );
      }
    );

module.exports = initialize
