const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    visitorName: {
        type: String,
        required: true,
    },
    wing: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true
    },
    date :{
        type: String,
        required : true,
        default : new Date().toLocaleDateString()
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
        type: String,
        required: true,
        default: new Date().toLocaleDateString()
    },
    updatedDate: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString()
    }
});

module.exports = mongoose.model('Visitor', visitorSchema);

