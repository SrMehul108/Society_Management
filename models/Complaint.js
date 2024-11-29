const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complainerName: {
        type: String,
        required: true
    },
    complaintName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    wing: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium',
        required : true
    },
    status: {
        type: String,
        enum: ['open', 'pending', 'solve'],
        default: 'pending',
        required : true
    },
    type:{
        type : String,
        enum : ['request', 'complaint'],
        defaul : 'complaint',
        required : true
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

module.exports = mongoose.model('Compalint', complaintSchema);

