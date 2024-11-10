const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    wing: {
        type: String,
        require: true
    },
    unit: {
        type: String,
        required: true,
        unique: true
    },
    aadharImage_front: {
        type: String,
        required: false
    },
    aadharImage_back: {
        type: String,
        required: false
    },
    addressProofImage: {
        type: String,
        required: false
    },
    rentalAgreementImage: {
        type: String,
        required: false
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true
    },
    isActive: {
        type: Boolean,
        enum: ['True', 'False'],
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
    },
    role:{
        type: String,
        required: true,
        default: 'user'
    },
    password:{
        type: String, 
        required: true
    },
    type: {
        type: String,
        enum: ['owner', 'tenant'],
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);

