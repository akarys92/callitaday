var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a account schema
var accountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    caller: { type: Schema.Types.ObjectId, ref: 'Caller', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'Receiver', required: true },
    is_active: {type: Boolean, default: false },
    created_at: { type: Date, required: true },
    updated_at: { type: Date },
    last_paid: { type: Date },
    next_payment: { type: Date, required: true }
});

accountSchema.pre('save', function(next) {
  // get the current date
    var currentDate = new Date();

  // change the updated_at field to current date
    this.updated_at = currentDate;

    next();
});

// Create the Model
var User = mongoose.model('Account', accountSchema);

// export the model
module.exports = User;