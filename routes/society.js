const express = require('express');
const router = express.Router();
const { insertSociety, getSociety } = require('../controllers/societyController');
router.post('/insertSociety', insertSociety);
router.get('/getSociety', getSociety);
router.use('/chat', require('./chat'));
router.use('/call', require('./call'));
module.exports = router;