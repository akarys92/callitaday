var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a receiver schema
var receiverSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'Caller' },
    phone_number: { type: String, required: true, unique: true },
    created_at: Date,
    updated_at: Date
});

receiverSchema.pre('save', function(next) {
  // get the current date
    var currentDate = new Date();

  // change the updated_at field to current date
    this.updated_at = currentDate;

    next();
});

// Create the Model
var User = mongoose.model('Receiver', receiverSchema);

// export the model
module.exports = User;