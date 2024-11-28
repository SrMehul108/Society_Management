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
        required: true
    },
    unit: {
        type: Number,
        required: true,
    },
    profile_image:{
        type: String,
        required : false
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
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['owner', 'tenant'],
        default : 'owner',
        required: function() {
            return this.role === 'security';
        }
    },
    owner: {
        fullname: {
            type: String,
            required: function() {
                return this.type === 'tenant';
            }
        },
        phoneNo: {
            type: String,
            required: function() {
                return this.type === 'tenant';
            }
        },
        address: {
            type: String,
            required: function() {
                return this.type === 'tenant';
            }
        }
    },
    shift :{
        type : String,
        enum :['day', 'night'],
        required: function() {
            return this.role === 'security';
        }
    },
    shiftDate :{
        type : String,
        required: function() {
            return this.role === 'security';
        }
    },
    shiftTime :{
        type: String,
        required: function() {
            return this.role === 'security';
        }
    },
    role:{
        type: String,
        enum : ['user', 'security'],
        required : true,
        default :"user"
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
    },
});

module.exports = mongoose.model('User', userSchema);

