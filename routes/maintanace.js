const express = require('express');
const router = express.Router();
const { insert, viewMaintance, maintenanceDetail } = require('../controllers/maintanacecontroller');
router.post('/insert',insert);
router.get('/getMaintance', viewMaintance);
router.get('/maintenanceDetail', maintenanceDetail);
module.exports = router