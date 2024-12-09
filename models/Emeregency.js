const mongoose = require("mongoose");

const emeregencySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true

    },
    description: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }],
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

module.exports = mongoose.model("Emergency", emeregencySchema);
