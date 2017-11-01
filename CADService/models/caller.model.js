var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a caller schema
var callerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
    created_at: Date,
    updated_at: Date
});

callerSchema.pre('save', function(next) {
  // get the current date
    var currentDate = new Date();

  // change the updated_at field to current date
    this.updated_at = currentDate;

    next();
});

// Create the Model
var User = mongoose.model('Caller', callerSchema);

// export the model
module.exports = User;