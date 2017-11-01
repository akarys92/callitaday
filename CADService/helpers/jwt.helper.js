var jwt = require('jsonwebtoken');
var config = require('../config.json');

function JWTHelper() {
    this.GenerateJWT = function(id, user_email, isAdmin) {
        if(!isAdmin) {
            isAdmin = false;
        }
        var secret = config.jwt.secret;
        var payload = {
            "user_id": id,
            "email": user_email,
            "is_admin": isAdmin
        }
        var token = jwt.sign(payload, secret, {
            expiresIn: "1440m" // expires in 24 hours
        });
        return token;
    }

    this.TokenCheck = function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var secret = config.jwt.secret;

        // decode token
        if (token) {

            // TODO: Confirm that this is properly checking for token expiration
            jwt.verify(token, secret, function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
            }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
        }
        }
}

module.exports = new JWTHelper();