var Receiver = require('../models/receiver.model');
var mongoose = require('mongoose');

function ReceiverService() {
    // Take inputs and attempt to create a receiver, returns true if successful
    this.CreateReceiver = function(newName, newPhone_number, created_by_id) {
        
        var newReceiver = {
            _id: new mongoose.mongo.ObjectId(),
            name: newName,
            phone_number: newPhone_number,
            created_at:  Date.now(),
            created_by: created_by_id
        };
        var receiver = new Receiver(newReceiver);
       
        return receiver.save();
    }
    // TODO: Should we limit to only receivers that were created by the current caller?
    this.GetReceiver = function(name, phone_number) {
        return Receiver.find(
            {"name": { "$regex": name, "$options": "i" }, 
            "phone_number": { "$regex": phone_number, "$options": "i" }
        }).exec();
    }
}
module.exports = new ReceiverService();