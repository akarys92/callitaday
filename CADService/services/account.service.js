var Account = require('../models/account.model');
var mongoose = require('mongoose');

function AccountService() {
    // Take inputs and attempt to create a account, returns true if successful
    this.CreateAccount = function(callerId, receiverId) {
        var newAccount = {
            _id: new mongoose.mongo.ObjectId(),
            caller: callerId,
            receiver: receiverId,
            created_at: Date.now(),
            next_payment: Date.now()
        };
        var account = new Account(newAccount);
       
        return account.save();
    }

    this.MakePayment = function(accountId) {
        var state = {"status": true, "message": ""};;
        Account.findById(accountId, function(err, account) {
            if (err) {
                console.error(err);
                state.status = false;
                state.message = err;
                return state;
            } 
             // change the accounts location
            account.is_active = true;
            account.last_paid = Date.now();
            account.next_payment = Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));

            // save the account
            account.save(function(err) {
                if (err) {
                    console.error(err);
                    state.status = false;
                    state.message = err;
                    return state;
                }

                console.log('Account payment successfully updated!');
            });

        });
    }
    this.GetAccountById = function(accountId) {
        return Account.findById(accountId);
    }

    this.QueryByCaller = function(caller) {
        return Account.find({"caller": caller}).exec();
    }
}

module.exports = new AccountService();
