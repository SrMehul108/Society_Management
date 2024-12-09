const express = require('express');
const router = express.Router();
const {insertComplaint, viewComplaint, editComplaint, deleteComplaint} = require('../controllers/complaintconroller');

router.post('/insertComplaint', insertComplaint);
router.get('/viewComplaint', viewComplaint);
router.post('/editComplaint/:id', editComplaint);
router.delete('/deleteComplaint/:id', deleteComplaint)

module.exports = router;