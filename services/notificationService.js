const socketInstance = require('../socket/socketInstance');  // Import socketInstance

exports.sendNotification = async ({ type, message, societyId, targetUsers }) => {
    try {
        // Save the notification to the database
        const newNotification = new Notification({ type, message, societyId, targetUsers });
        await newNotification.save();

        // Emit the notification to clients in the society room
        const io = socketInstance.getIO();  // Get the initialized io instance

        if (io) {
            io.to(`society-${societyId}`).emit('new-notification', {
                type,
                message,
                societyId,
                targetUsers,
                timestamp: new Date(),
            });
        }

        return newNotification;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};