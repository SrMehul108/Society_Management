const express = require('express');
const router = express.Router();
const upload = require('../services/multer.service');
const { insertUser, viewUser, editUser, deleteUser } = require('../controllers/usercontrolleer');

router.post('/insertUser', upload.fields([
  { name: 'profile_image', maxCount: 1 }, { name: 'aadharImage_front', maxCount: 1 }, { name: 'aadharImage_back', maxCount: 1 }, { name: 'addressProofImage', maxCount: 1 }, { name: 'rentalAgreementImage', maxCount: 1 }]), insertUser);

router.get('/getUser', viewUser);

router.post('/editUser/:id', upload.fields([
  { name: 'profile_image', maxCount: 1 }, { name: 'aadharImage_front', maxCount: 1 }, { name: 'aadharImage_back', maxCount: 1 }, { name: 'addressProofImage', maxCount: 1 }, { name: 'rentalAgreementImage', maxCount: 1 }]), editUser);

router.delete('/vacateUser/:id', deleteUser);

router.use('/maintanace', require('./maintanace'));
router.use('/otheincome', require('./otherIncome'));
router.use('/important', require('./important'));
router.use('/expenses', require('./expenses'));
router.use('/note', require('./note'));
router.use('/facility', require('./facility'));
router.use('/complaint', require('./complaint'));
module.exports = router;