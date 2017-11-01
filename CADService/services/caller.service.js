var Caller = require('../models/caller.model');
var mongoose = require('mongoose');

function CallerService() {
    // Take inputs and attempt to create a caller, returns true if successful
    this.CreateCaller = function(newName, newPhone_number, newEmail, newPassword, success, failure) {
        var newCaller = {
            _id:  new mongoose.mongo.ObjectId(),
            name: newName,
            phone_number: newPhone_number,
            email: newEmail,
            password: newPassword,
            created_at:  Date.now(),
            is_admin: false
        };
        var caller = new Caller(newCaller);
        return caller.save();
    }

    this.GetCallerbyEmail = function(email) {
        var promise = Caller.findOne({'email': email}).exec();
        return promise;
    }
}

module.exports = new CallerService();