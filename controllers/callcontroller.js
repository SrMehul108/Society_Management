const callService = require("../services/callservice");
const { sendResponse } = require("../services/responseHandler");
const socketInstance = require('../socket/socketInstance');
const onlineUsers = socketInstance.getUserAvailability();

module.exports.startCall = async (req, res) => {
    const { roomId, callerId, calleeId } = req.body;
    // Validate inputs
    if (!roomId || !callerId || !calleeId) {
        return res.status(400).json({ message: "Missing required fields: roomId, callerId, or calleeId." });
    }
    // Validate the existence of onlineUsers
    if (!onlineUsers) {
        console.error("onlineUsers object is undefined. Socket instance may not be initialized properly.");
        return res.status(500).json({ message: "Socket instance is not properly initialized." });
    }
    // Find callee's socket ID
    const calleeSocketId = Object.keys(onlineUsers).find(
        (socketId) => onlineUsers[socketId].userId === calleeId
    );
    // Check if the callee is available for a call
    if (!calleeSocketId) {
        return res.status(400).json({ message: "The callee is not online or registered." });
    }
    const isAvailable =
        typeof onlineUsers === "function" &&
        onlineUsers(calleeSocketId);

    if (!isAvailable) {
        return res.status(400).json({ message: "The callee is not available for a call." });
    }
    try {
        // Log the call details
        const newCall = await callService.logCall({ roomId, participants: [callerId, calleeId] });
        // Emit a socket event to notify the callee about the incoming call
        const io = socketInstance.getIO();
        io.to(calleeSocketId).emit("incoming-call", { roomId, callerId });

        return res.status(200).json({ message: "Call initiated successfully.", data: newCall });
    } catch (error) {
        console.error("Error starting call:", error);
        return res.status(500).json({ message: "Failed to initiate call." });
    }
};



module.exports.endCall = async (req, res) => {
    try {
        const { roomId } = req.body;
        const endedCall = await callService.endCall(roomId);
        return sendResponse(res, 200, "Call ended successfully.", 1, endedCall);
    } catch (error) {
        return sendResponse(res, 500, "Failed to end call.", 0);
    }
};
