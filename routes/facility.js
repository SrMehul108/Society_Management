const express = require('express');
const router = express.Router();
const {insertFacility, viewFacility, editFacility, deleteFacility} = require('../controllers/facilitycontroller');

router.post('/insertFacility', insertFacility);
router.get('/viewFacility', viewFacility);
router.post('/editFacility/:id', editFacility);
router.delete('/deleteFacility/:id', deleteFacility);
module.exports = router;
