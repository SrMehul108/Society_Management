let io;

module.exports = {
    /**
     * Initialize Socket.IO with the given server instance.
     * @param {Object} server - The HTTP server instance
     */
    init: (server) => {
        // Only initialize once
        if (!io) {
            io = require('socket.io')(server, {
                cors: {
                    origin: '*', // Allow all origins (you can restrict this to specific domains)
                    methods: ['GET', 'POST'],
                },
            });

            // Log when a client connects
            io.on('connection', (socket) => {
                console.log('New client connected:', socket.id);

                // Listen for when the client joins a society room
                socket.on('join-society', (societyId) => {
                    socket.join(`society-${societyId}`);
                    console.log(`Client ${socket.id} joined society-${societyId}`);
                });

                // Handle client disconnect
                socket.on('disconnect', () => {
                    console.log('Client disconnected:', socket.id);
                });
            });
        }

        // Return the Socket.IO instance for use in the rest of the app
        return io;
    },

    /**
     * Get the current Socket.IO instance
     * @throws Will throw an error if Socket.IO is not initialized
     */
    getIO: () => {
        if (!io) {
            throw new Error('Socket.IO has not been initialized. Please call init() first.');
        }
        return io;
    },
};
