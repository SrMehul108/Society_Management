const mongoose = require("mongoose");

const CallSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true

    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }],
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
});

module.exports = mongoose.model("Call", CallSchema);
