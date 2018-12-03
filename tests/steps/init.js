'use strict';

const co = require('co');
const Promise = require('bluebird');
const awscred = Promise.promisifyAll(require('awscred'));

let initialized = false;

let init = co.wrap(function* () {
    if (initialized) {
        return;
    }

    process.env.restaurants_api = "https://rjelh2ebb7.execute-api.us-east-1.amazonaws.com/dev/restaurants";
    process.env.restaurants_table = "restaurants";
    process.env.AWS_REGION = "us-east-1";
    process.env.cognito_user_pool_id = "us-east-1_0TK77AD73";
    process.env.cognito_client_id = "cognito_client_id";
    process.env.cognito_server_client_id = "2fret7jdlkqc0c2nb5st9du3mb";

    if (!process.env.AWS_ACCESS_KEY_ID) {
        let cred = (yield awscred.loadAsync()).credentials;
    
        process.env.AWS_ACCESS_KEY_ID = cred.accessKeyId;
        process.env.AWS_SECRET_ACCESS_KEY = cred.secretAccessKey;
    
        console.log("AWS credentials loaded");
      }

    initialized = true;
});

module.exports.init = init;