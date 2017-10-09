// External imports
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Create an express app
var app = express();

// Use middleware
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies

// Routes 
var message_routes = require('./routes/messages.route');

app.use('/message', message_routes);

// Load Static
app.use(express.static(__dirname + '/public'))
    .use(cookieParser());

/**************************************************************** */
var port = process.env.ENVKEY ? process.env.PORT : 8888;
console.log('Listening on ' + port);
app.listen(port);