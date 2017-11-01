var request = require('request'); 
var bodyParser = require('body-parser'); 
var CallerService = require('../services/caller.service');
var PwHelper = require('../helpers/password.helper');
var JwtProvider = require('../helpers/jwt.helper');

function CallerController() {

    /*** Public Methods ***/
    this.CreateCaller = function(req, res) {
        var body = req.body;
        var password = PwHelper.HashPassword(body.password);
        var promise = CallerService.CreateCaller(body.name, body.phone_number, body.email, password);
        
        promise.then(function(caller){
            res.status(201).send({"message": "New Caller created!", "Caller": caller});
        }).catch(function(err){
            res.status(500).send(err);
        });
    }

    this.Login = function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        
        CallerService.GetCallerbyEmail(email)
            .then((caller) => {
                if(PwHelper.CheckHash(password, caller._doc.password)) {
                    var jwt = JwtProvider.GenerateJWT(caller._doc._id, caller._doc.email, caller._doc.is_admin);
                    res.status(200).send({"message": "Login successful!", "token": jwt});
                }
                else {
                    res.status(401).send({"message": "Password does not match."});
                }
            })
            .catch((error) => {
                res.status(401).send({"message": "Email not found in system.", "error": error});
            });
    }
    /*** Private Methods */


    /*** Random helpers ***/
    
}

module.exports = new CallerController();