var request = require('request'); 
var bodyParser = require('body-parser'); 
var ReceiverService = require('../services/receiver.service');

function ReceiverController() {

    /*** Public Methods ***/
    this.CreateReceiver = function(req, res) {
        // TODO: Should add a "CreatedBy" field
        var body = req.body;
        var created_by = req.decoded.user_id;
        var promise = ReceiverService.CreateReceiver(body.name, body.phone_number, created_by);
        
        promise.then((receiver) => {
            res.status(201).send({"message": "Receiver created!", "receiver": receiver});
        }).catch((err) => {
            res.status(400).send(err);
        });
    }

    this.QueryReceiver = function(req, res) {
        var promise = ReceiverService.GetReceiver(req.body.name, req.body.phone_number);
        console.log(req.decoded);
        promise.then((receiverList) => {
            res.status(200).send(receiverList);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Could not complete request");
        });
    }
    /*** Private Methods */


    /*** Random helpers ***/
    
}

module.exports = new ReceiverController();