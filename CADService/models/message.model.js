var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a message schema
var messageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    call_date: { type: Date, required: true },
    call_status: { type: String, enum : ['IDLE','QUEUED', 'SENT'], default: 'IDLE' },
    message: { type: String, required: true },
    created_at: Date
});

// Create the Model
var User = mongoose.model('Message', messageSchema);

// export the model
module.exports = User;