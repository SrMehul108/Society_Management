const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    facilityName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    reminderDate: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 2
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date().now()
    },
    updatedDate: {
        type: String,
        required: true,
        default: Date().now()
    },

});

module.exports = mongoose.model('Facility', facilitySchema);

