const chatService = require("../services/chatService");

/**
 * Get all messages between two users.
 */
module.exports.getMessages = async (req, res) => {
    try {
        const { from, to } = req.query;
        if (!from || !to) {
            return res.status(400).json({ error: "Missing 'from' or 'to' query parameters" });
        }
        const messages = await chatService.getMessages(from, to);
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

/**
 * Save a new message (text, image, video, or audio).
 */
module.exports.sendMessage = async (req, res) => {
    try {
        const { from, to, message, type } = req.body;
        if (!from || !to || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const savedMessage = await chatService.saveMessage({ from, to, message, type });
        res.status(201).json({ message: "Message sent successfully", data: savedMessage });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
};

/**
 * Mark a message as read.
 * @param {Object} req - The request object (contains message ID).
 * @param {Object} res - The response object.
 */
module.exports.markAsRead = async (req, res) => {
    const { messageId } = req.body;

    try {
        // Call the service to mark the message as read
        const updatedMessage = await chatService.markAsRead(messageId);

        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        return res.status(200).json({ message: 'Message marked as read', updatedMessage });
    } catch (error) {
        console.error('Error marking message as read:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};