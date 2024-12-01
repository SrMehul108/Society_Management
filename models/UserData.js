const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
    },
    profile_image: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: false
    },
    age :{
        type : Number,
        required : false
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'security'],
        default: 'user'
    },
    metaData: {
        wing: {
            type: String,
            required: function() {
                return this.role === 'user';
            }
        },
        unit: {
            type: Number,
            required: function() {
                return this.role === 'user';
            }
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
            ref: 'Member',
            required : false
        }],
        vehicles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle',
            required : false
        }],
        type: {
            type: String,
            enum: ['owner', 'tenant'],
            required: false
        },
        owner: {
            fullname: {
                type: String,
                required: function () {
                    return this.metaData?.type === 'tenant';
                }
            },
            phoneNo: {
                type: String,
                required: function () {
                    return this.metaData?.type === 'tenant';
                }
            },
            address: {
                type: String,
                required: function () {
                    return this.metaData?.type === 'tenant';
                }
            },
        },
    },
    securityData: {
        shift: {
            type: String,
            enum: ['day', 'night'],
            required: function () {
                return this.role === 'security';
            }
        },
        shiftDate: {
            type: String,
            required: function () {
                return this.role === 'security';
            }
        },
        shiftTime: {
            type: String,
            required: function () {
                return this.role === 'security';
            }
        },
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    createdDate: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString()
    },
    updatedDate: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString()
    },
});

module.exports = mongoose.model('UserModel', UserSchema);
