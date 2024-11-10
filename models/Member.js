const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    relation: {
        type: String,
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
});

module.exports = mongoose.model('Member', memberSchema);

