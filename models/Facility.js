const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    facilityName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    reminderDay: {
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
        type: String,
        required: true,
        default: new Date().toLocaleDateString()
    },
    updatedDate: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString()
    },

});

module.exports = mongoose.model('Facility', facilitySchema);

