const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['cash', 'online'],
        default : 'cash',
        required: true
    },
    paymentStatus: {
        type: Boolean,
        default: false,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required : true
    }
    
});

module.exports = mongoose.model('Payment', paymentSchema);

