const express = require("express");
const {endCall, startCall} = require("../controllers/callcontroller");

const router = express.Router();

router.post("/start", startCall); // Log the start of a call
router.post("/end", endCall); // Log the end of a call

module.exports = router;
