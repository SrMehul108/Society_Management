const express = require('express');
const router = express.Router();
const { insert } = require('../controllers/maintanacecontroller');
router.post('/insert',insert);

module.exports = router