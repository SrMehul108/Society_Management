const { sendResponse } = require("../services/responseHandler");
const callService = require("../services/callservice");
const socketInstance = require('../socket/socketInstance');

module.exports.startCall = async (req, res) => {
    const { roomId, callerId, calleeId } = req.body;
    if (!roomId || !callerId || !calleeId) {
        return sendResponse(res, 400, "Missing required fields: roomId, callerId, or calleeId.", 0);
    }
    try {
        const onlineUsers = socketInstance.getOnlineUsers();
        const io = socketInstance.getIO();
        if (!onlineUsers) {
            console.error("Socket instance is not initialized properly.");
            return sendResponse(res, 500, "Socket instance is not properly initialized.", 0);
        }
        const calleeSocketId = Object.keys(onlineUsers).find(
            (socketId) => onlineUsers[socketId].userId === calleeId
        );
        if (!calleeSocketId) {
            return sendResponse(res, 404, "The callee is either offline or not registered.", 0);
        }
        const isAvailable = socketInstance.getUserAvailability(calleeSocketId);
        if (!isAvailable) {
            return sendResponse(res, 400, "The callee is not available for a call.", 0);
        }
        const newCall = await callService.logCall({ roomId, participants: [callerId, calleeId] });
        io.to(calleeSocketId).emit("incoming-call", { roomId, callerId });
        return sendResponse(res, 200, "Call initiated successfully.", 1, newCall);
    } catch (error) {
        console.error("Error starting call:", error);
        return sendResponse(res, 500, "Failed to initiate call.", 0, error.message);
    }
};

module.exports.endCall = async (req, res) => {
    const { roomId } = req.body;
    if (!roomId) {
        return sendResponse(res, 400, "Missing required field: roomId.", 0);
    }
    try {
        const endedCall = await callService.endCall(roomId);
        if (!endedCall) {
            return sendResponse(res, 404, "Call not found or already ended.", 0);
        }
        return sendResponse(res, 200, "Call ended successfully.", 1, endedCall);
    } catch (error) {
        console.error("Error ending call:", error);
        return sendResponse(res, 500, "Failed to end call.", 0, error.message);
    }
};
