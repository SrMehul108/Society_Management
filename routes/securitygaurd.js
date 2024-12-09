const express = require('express');
const router = express.Router();
const { vistorLog, getEntry } = require('../controllers/visitorcontroller');
const { createEmergency } = require('../controllers/authcontroller');
router.post('/visitorentry', vistorLog);
router.get('/getVisitor', getEntry);
router.post('/insertemergency',createEmergency)
module.exports = router;