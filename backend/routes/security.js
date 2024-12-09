const express = require('express');
const router = express.Router();
const {vistorLog, getEntry, editEntry, deleteEntry} = require('../controllers/visitorcontroller');
const {insertProtocol, viewProtocol, editProtocol, deleteProtocol} = require('../controllers/protocolcontroller');

// Visitor routes
router.post('/vistorEntry', vistorLog);
router.get('/getEntry', getEntry);
router.post('/editVisitorDetail/:id', editEntry);
router.delete('/deleteVistior/:id', deleteEntry);

// Security Protocol

router.post('/createProtocol', insertProtocol);
router.get('/getProtocol', viewProtocol);
router.post('/editProtocol/:id', editProtocol);
router.delete('/deleteProtocol/:id', deleteProtocol);
module.exports = router