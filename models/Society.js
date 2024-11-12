const mongoose = require('mongoose');
const societySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    createdDate: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString()
    },
    updatedDate: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString()
    },
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});
module.exports = mongoose.model('Society', societySchema);