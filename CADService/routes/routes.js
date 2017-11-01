var message_routes = require('./messages.route');
var caller_routes = require('./caller.route');
var receiver_routes = require('./receiver.route');
var account_routes = require('./account.route');
var token_check = require('../helpers/jwt.helper').TokenCheck;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

function Routes(app) {
    // Use middleware
    app.use(cookieParser());
    app.use(bodyParser.json()); 

    app.use('/caller', caller_routes);
    app.use(token_check);
    app.use('/message', message_routes);
    app.use('/receiver', receiver_routes);
    app.use('/account', account_routes);
}

module.exports = Routes;