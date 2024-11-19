const express = require('express');
const router = express.Router();
const { insert, viewMaintance, maintenanceDetail,editMaintenance, deleteMaintenance } = require('../controllers/maintanacecontroller');
router.post('/insert',insert);
router.get('/getMaintance', viewMaintance);
router.get('/maintenanceDetail', maintenanceDetail);
router.post('editMaintenance/:id', editMaintenance);
router.delete('/deleteMaintenance/:id', deleteMaintenance);
module.exports = router