const mongoose = require('mongoose');

const otherincomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description :{
        type: String,
        required : true,
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
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

module.exports = mongoose.model('OtherIncome', otherincomeSchema);

