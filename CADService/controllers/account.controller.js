var request = require('request'); 
var bodyParser = require('body-parser'); 
var AccountService = require('../services/account.service');

function AccountController() {

    /*** Public Methods ***/
    this.CreateAccount = function(req, res) {
        var body = req.body;
        var promise = AccountService.CreateAccount(req.decoded.user_id, body.receiver_id);
        
        promise.then(function(account){
            res.status(201).send({"message": "Account created!", "account": account});
        }).catch(function(err){
            res.status(400).send(err);
        });
    }

    this.GetByCaller = function(req, res) {
        var caller_id = req.decoded.user_id;
        var promise = AccountService.QueryByCaller(caller_id);

        promise.then((accountList)=>{
            res.status(200).send(accountList);
        })
        .catch((err)=>{
            res.status(400).send(err);
        });
    }

    /*** Private Methods */


    /*** Random helpers ***/
    
}

module.exports = new AccountController();