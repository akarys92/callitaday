// External imports
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./config.json');

// REMOVE THESE
var user = config.Mongo.user;
var password = config.Mongo.password;

// Connect to database
mongoose.Promise = require('bluebird');

var db = mongoose.connection;
mongoose.connect('mongodb://' + user + ':' + password + '@ds113785.mlab.com:13785/callitaday', { useMongoClient: true })
    .then(function(){
    console.log(" Connected to dbName ".green);

    }).catch(err => console.error(err));

// Create an express app
var app = express();

// use morgan to log requests to the console
app.use(morgan('dev'));

// Routes 
var Routes = require('./routes/Routes')(app);

/**************************************************************** */
var port = process.env.ENVKEY ? process.env.PORT : 8888;
console.log('Listening on ' + port);
app.listen(port);