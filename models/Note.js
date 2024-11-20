const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true
    },  
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', noteSchema);

