let io;
let onlineUsers = {}; // Track users by socket ID

module.exports = {
    init: (server) => {
        if (!io) {
            io = require("socket.io")(server, {
                cors: {
                    origin: "*", // Replace with specific origin in production
                    methods: ["GET", "POST"],
                },
            });

            io.on("connection", (socket) => {
                console.log("New client connected:", socket.id);

                // Track the online user
                socket.on("register-user", (userId) => {
                    if (!userId) {
                        console.warn(`Socket ${socket.id} tried to register without a userId`);
                        return;
                    }
                    onlineUsers[socket.id] = { socketId: socket.id, userId, isAvailable: true };
                    console.log(`User ${userId} registered with socket ${socket.id}`);
                    io.emit("update-online-users", onlineUsers);
                });

                // Join society rooms
                socket.on("join-society", (societyId) => {
                    if (!societyId) {
                        console.warn(`Socket ${socket.id} tried to join a society without societyId`);
                        return;
                    }
                    socket.join(`society-${societyId}`);
                    console.log(`Socket ${socket.id} joined society ${societyId}`);
                });

                // Join chat rooms
                socket.on("join-chat", (roomId) => {
                    if (!roomId) {
                        console.warn(`Socket ${socket.id} tried to join a chat room without roomId`);
                        return;
                    }
                    socket.join(`chat-${roomId}`);
                    console.log(`Socket ${socket.id} joined chat room ${roomId}`);
                });

                // Send messages
                socket.on("send-message", (message) => {
                    const { to, from, message: text, type } = message;
                    if (!to || !from || !text) {
                        console.warn(`Invalid message data received from socket ${socket.id}`);
                        return;
                    }

                    const recipientSocketId = Object.keys(onlineUsers).find(
                        (id) => onlineUsers[id].userId === to
                    );

                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit("receive-message", message);
                    } else {
                        console.log(`Recipient with user ID ${to} is not online.`);
                    }
                });

                // Handle call availability
                socket.on("start-call", () => {
                    if (onlineUsers[socket.id]) {
                        onlineUsers[socket.id].isAvailable = false;
                        io.emit("update-online-users", onlineUsers);
                    }
                });

                socket.on("end-call", () => {
                    if (onlineUsers[socket.id]) {
                        onlineUsers[socket.id].isAvailable = true;
                        io.emit("update-online-users", onlineUsers);
                    }
                });

                // Handle disconnection
                socket.on("disconnect", () => {
                    console.log("Client disconnected:", socket.id);
                    delete onlineUsers[socket.id];
                    io.emit("update-online-users", onlineUsers);
                });
            });
        }

        console.log("Socket.IO initialized");
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

    // Expose onlineUsers for external use
    getOnlineUsers: () => onlineUsers,
};