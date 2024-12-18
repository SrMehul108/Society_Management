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

                // Join chat rooms
                socket.on("join-chat", (roomId) => {
                    if (!roomId) {
                        console.warn(`Socket ${socket.id} tried to join a chat room without roomId`);
                        return;
                    }
                    socket.join(`chat-${roomId}`);
                    console.log(`Socket ${socket.id} joined chat room ${roomId}`);
                });

                // Handle sending messages
                socket.on("send-message", (data) => {
                    const { to, from, message: text, roomId } = data;

                    if (!to || !from || !text || !roomId) {
                        console.warn(`Invalid message data received from socket ${socket.id}`);
                        return;
                    }

                    // Send message to the specific user in the room
                    const recipientSocketId = Object.keys(onlineUsers).find(
                        (id) => onlineUsers[id].userId === to
                    );

                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit("receive-message", {
                            from,
                            to,
                            message: text,
                            roomId,
                        });
                        console.log(`Message sent from ${from} to ${to} in room ${roomId}`);
                    } else {
                        console.log(`User ${to} is not online. Message not delivered.`);
                    }
                });

                // Handle receiving messages
                socket.on("receive-message", (data) => {
                    console.log(`Message received by user:`, data);
                });

                // Handle call initiation
                socket.on("call-user", (data) => {
                    const { roomId, to, from } = data;

                    const recipientSocketId = Object.keys(onlineUsers).find(
                        (id) => onlineUsers[id].userId === to
                    );

                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit("incoming-call", { from, roomId });
                    } else {
                        console.warn(`Cannot call user ${to}: user not online.`);
                    }
                });

                // Handle call offer/answer exchange
                socket.on("offer-call", (data) => {
                    const recipientSocketId = Object.keys(onlineUsers).find(
                        (id) => onlineUsers[id].userId === data.to
                    );

                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit("receive-offer", data);
                    } else {
                        console.warn(`Cannot send offer to user ${data.to}: user not online.`);
                    }
                });

                socket.on("answer-call", (data) => {
                    const recipientSocketId = Object.keys(onlineUsers).find(
                        (id) => onlineUsers[id].userId === data.to
                    );

                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit("receive-answer", data);
                    } else {
                        console.warn(`Cannot send answer to user ${data.to}: user not online.`);
                    }
                });

                socket.on("ice-candidate", (data) => {
                    const recipientSocketId = Object.keys(onlineUsers).find(
                        (id) => onlineUsers[id].userId === data.to
                    );

                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit("receive-ice-candidate", data);
                    } else {
                        console.warn(`Cannot send ICE candidate to user ${data.to}: user not online.`);
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
