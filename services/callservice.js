const Call = require("../models/Calling");

exports.logCall = async ({ roomId, participants }) => {
    try {
        const newCall = new Call({ roomId, participants });
        await newCall.save();
        return newCall;
    } catch (error) {
        console.error("Error logging call:", error);
        throw error;
    }
};

exports.endCall = async (roomId) => {
    try {
        const call = await Call.findOneAndUpdate({ roomId }, { endTime: new Date() }, { new: true });
        return call;
    } catch (error) {
        console.error("Error ending call:", error);
        throw error;
    }
};
