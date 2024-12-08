const express = require('express');
const router = express.Router();
const { userDetail } = require('../controllers/residentcontroller');
const { SocietyFinanceDetail, PendingMaintenanceList } = require('../controllers/authcontroller');
router.get('/userdetail',userDetail);
router.get('/SocietyBalance', SocietyFinanceDetail);
router.get('/pendingMaintenanceList', PendingMaintenanceList);
module.exports = router;