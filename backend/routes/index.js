const express = require('express');
const router = express.Router();
router.use('/auth', require('./auth'));
router.use('/society', require('./society'));
module.exports = router;