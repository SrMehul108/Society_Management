const express = require('express');
const router = express.Router();
const upload = require('../services/multer.service');
const { insertUser, viewUser, editUser, deleteUser, addNewSecurity, viewSecurity, editSecurity, deleteSecurity } = require('../controllers/usercontrolleer');

// Resident
router.post('/insertUser', upload.fields([
  { name: 'profile_image', maxCount: 1 }, { name: 'aadharImage_front', maxCount: 1 }, { name: 'aadharImage_back', maxCount: 1 }, { name: 'addressProofImage', maxCount: 1 }, { name: 'rentalAgreementImage', maxCount: 1 }]), insertUser);

router.get('/getUser', viewUser);

router.post('/editUser/:id', upload.fields([
  { name: 'profile_image', maxCount: 1 }, { name: 'aadharImage_front', maxCount: 1 }, { name: 'aadharImage_back', maxCount: 1 }, { name: 'addressProofImage', maxCount: 1 }, { name: 'rentalAgreementImage', maxCount: 1 }]), editUser);

router.delete('/vacateUser/:id', deleteUser);


// Security Gaurd
router.post('/addNewSecurity', upload.fields([{ name: 'aadharImage_front', maxCount: 1 }, { name: 'profile_image', maxCount: 1 }]), addNewSecurity);
router.get('/getSecurity', viewSecurity);
router.post('/editSecurity/:id', upload.fields([{ name: 'aadharImage_front', maxCount: 1 }, { name: 'profile_image', maxCount: 1 }]), editSecurity);
router.delete('/deleteSecurity/:id', deleteSecurity);



// Other Secure Routes 
router.use('/maintanace', require('./maintanace'));
router.use('/otheincome', require('./otherIncome'));
router.use('/important', require('./important'));
router.use('/expenses', require('./expenses'));
router.use('/note', require('./note'));
router.use('/facility', require('./facility'));
router.use('/complaint', require('./complaint'));
module.exports = router;