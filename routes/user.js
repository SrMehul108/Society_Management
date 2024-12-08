const express = require('express');
const router = express.Router();
const { userDetail } = require('../controllers/residentcontroller');
router.get('/userdetail',userDetail);

module.exports = router;