const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    penaltyAmount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    penaltyDay: {
        type: Number,
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

module.exports = mongoose.model('Maintenance', maintenanceSchema);

