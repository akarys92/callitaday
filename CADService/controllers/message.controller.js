var request = require('request'); 
var bodyParser = require('body-parser'); 
var MessageService = require('../services/message.service');
var AccountService = require('../services/account.service');

function MessageController() {

    /*** Public Methods ***/
    this.CreateMessage = function(req, res) {
        AccountService.GetAccountById(req.body.account_id).then((account)=>{
            if(account.is_active) {
                var promise = MessageService.CreateMessage(req.body.account_id, req.body.message_uri, req.body.call_date);
                promise.then((message)=>{
                    res.status(201).send({"message": "Message created!", "content": message});
                }).catch((err)=>{
                    res.status(400).send(err);
                });
            }
            else {
                res.status(401).send("Account is not active. Please pay membership fee to send messages.");
            }
        })
        .catch((err)=>{
            res.status(400).send(err);
        });
        
    }
    /*** Private Methods */


    /*** Random helpers ***/
    
}

module.exports = new MessageController();