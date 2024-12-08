let io;
let onlineUsers = {}; // Track users by socket ID

module.exports = {
    init: (server) => {
        if (!io) {
            io = require("socket.io")(server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"],
                },
            });

            io.on("connection", (socket) => {
                console.log("New client connected:", socket.id);

                // Track the online user, store both socketId and userId
                socket.on("register-user", (userId) => {
                    onlineUsers[socket.id] = { socketId: socket.id, userId, isAvailable: true };
                    console.log(`User ${userId} registered with socket ${socket.id}`);
                    io.emit("update-online-users", onlineUsers);
                });

                // Join society or chat rooms as needed (can be omitted if irrelevant)
                socket.on("join-society", (societyId) => {
                    socket.join(`society-${societyId}`);
                });

                socket.on("join-chat", (roomId) => {
                    console.log(`Joined chat with roomId: ${roomId}`);
                    socket.join(`chat-${roomId}`);
                });

                // Handle sending messages
                socket.on("send-message", (message) => {
                    const { to, from, message: text, type } = message;

                    // Find the recipient's socket ID by userId
                    const recipientSocketId = Object.keys(onlineUsers).find(
                        (id) => onlineUsers[id].userId === to
                    );

                    // Emit the message to the recipient if they are online
                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit("receive-message", message);
                    } else {
                        console.log(`Recipient with user ID ${to} is not online.`);
                    }
                });

                // When a user starts a call, mark their availability as unavailable
                socket.on("start-call", (roomId) => {
                    onlineUsers[socket.id].isAvailable = false;
                    io.emit("update-online-users", onlineUsers);
                });

                // When the call ends, mark the user as available again
                socket.on("end-call", (roomId) => {
                    onlineUsers[socket.id].isAvailable = true;
                    io.emit("update-online-users", onlineUsers);
                });

                // Handle disconnects
                socket.on("disconnect", () => {
                    console.log("Client disconnected:", socket.id);
                    delete onlineUsers[socket.id];
                    io.emit("update-online-users", onlineUsers);
                });
            });
        }

        return io;
    },

    getIO: () => {
        if (!io) {
            throw new Error("Socket.IO has not been initialized. Please call init() first.");
        }
        return io;
    },

    // Get the status of a user (if they are available)
    getUserAvailability: (socketId) => {
        return onlineUsers[socketId]?.isAvailable || false;
    },
};
