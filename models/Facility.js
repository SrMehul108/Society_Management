const mongoose = require('mongoose');

const importantSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        unique: true,
        required: true
    },
    work: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Important', importantSchema);

