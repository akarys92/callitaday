var Message = require('../models/message.model');
var mongoose = require('mongoose');

function MessageService() {
    this.CreateMessage = function(accountId, messageURI, newCallDate) {
        var state = {"status": true, "message": ""};
        var newMessage = {
            _id: new mongoose.mongo.ObjectId(),
            account: accountId,
            message: messageURI,
            call_date: newCallDate,
            call_status: 'IDLE',
            created_at: Date.now()
        }

        var message = new Message(newMessage);

        message.save(function(err){
            state = {"status": false, "message": err};
            return state;
        });
        return state;
    }
}

module.exports = new MessageService();
