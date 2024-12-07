const express = require('express');
const router = express.Router();
const upload = require('../services/multer.service');
const { insertUser, viewUser, editUser, deleteUser, addNewSecurity, viewSecurity, editSecurity, deleteSecurity } = require('../controllers/usercontrolleer');
const { SocietyFinanceDetail } = require('../controllers/authcontroller');
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

router.get('/SocietyBalance',SocietyFinanceDetail);


// Other Secure Routes 
router.use('/maintanace', require('./maintanace')); //maintenance route
router.use('/otheincome', require('./otherIncome')); //other income route
router.use('/important', require('./important')); // important route
router.use('/expenses', require('./expenses')); // expenses route
router.use('/note', require('./note')); // note route
router.use('/facility', require('./facility')); // facility route
router.use('/complaint', require('./complaint')); // complaint route
router.use('/announce', require('./announcement')); // announcement route
router.use('/security', require('./security')); // security route
module.exports = router;