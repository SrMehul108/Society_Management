const callService = require("../services/callservice");
const { sendResponse } = require("../services/responseHandler");
const socketInstance = require('../socket/socketInstance');


module.exports.startCall = async (req, res) => {
    const { roomId, callerId, calleeId } = req.body;
    // Validate inputs
    if (!roomId || !callerId || !calleeId) {
        return sendResponse(res, 400, "Missing required fields: roomId, callerId, or calleeId.", 0);
    }
    // Validate the existence of onlineUsers
    if (!socketInstance.onlineUsers) {
        console.error("onlineUsers object is undefined");
        return sendResponse(res, 500, "Socket instance is not properly initialized.", 0);
    }
    // Find callee's socket ID
    const calleeSocketId = Object.keys(socketInstance.onlineUsers).find(
        (socketId) => socketInstance.onlineUsers[socketId].userId === calleeId
    );
    // Check if the callee is available for a call
    if (!calleeSocketId ||
        (typeof socketInstance.getUserAvailability === "function" && !socketInstance.getUserAvailability(calleeSocketId))) {
        return sendResponse(res, 400, "Caller is not available for a call.", 0)
    }
    try {
        // Log the call details
        const newCall = await callService.logCall({ roomId, participants: [callerId, calleeId] });
        // Emit a socket event to notify the callee about the incoming call
        if (socketInstance.io) {
            socketInstance.io.to(calleeSocketId).emit("incoming-call", { roomId, callerId });
        }
        return sendResponse(res, 200, "Call initiated successfully.", 1, newCall);
    } catch (error) {
        console.error("Error starting call:", error);
        return sendResponse(res, 500, "Failed to initiate call.", 0);
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
