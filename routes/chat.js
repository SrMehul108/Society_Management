const express = require("express");
const { getMessages, sendMessage } = require("../controllers/chatController");

const router = express.Router();

// Fetch chat messages
router.get("/messages", getMessages);

// Save a new chat message
router.post("/message", sendMessage);

module.exports = router;
