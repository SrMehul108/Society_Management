const mongoose = require('mongoose');

function getCurrentTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0].slice(0, 5); 
}

const protocolSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    date :{
        type: String,
        required : true,
        default : new Date().toLocaleDateString()
    },
    time :{
        type : String,
        required : true,
        default: getCurrentTime,
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
})

module.exports = mongoose.model('Protocol', protocolSchema);