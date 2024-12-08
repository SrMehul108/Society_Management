const callService = require("../services/callservice");
const socketInstance = require('../socket/socketInstance');


module.exports.startCall = async (req, res) => {
    const { roomId, callerId, calleeId } = req.body;

    const calleeSocketId = Object.keys(socketInstance.onlineUsers).find(
        (socketId) => socketInstance.onlineUsers[socketId].userId === calleeId
    );

    if (!calleeSocketId || !socketInstance.getUserAvailability(calleeSocketId)) {
        return res.status(400).json({ message: 'The user is not available for a call.' });
    }
    try {
        const newCall = await callService.logCall({ roomId, participants: [callerId, calleeId] });
        return res.status(201).json({ message: "Call started successfully", data: newCall });
    } catch (error) {
        console.error("Error starting call:", error);
        return res.status(500).json({ message: "Failed to start call" });
    }
};

module.exports.endCall = async (req, res) => {
    try {
        const { roomId } = req.body;
        const endedCall = await callService.endCall(roomId);
        res.status(200).json({ message: "Call ended successfully", data: endedCall });
    } catch (error) {
        res.status(500).json({ error: "Failed to end call" });
    }
};
