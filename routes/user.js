const express = require('express');
const router = express.Router();
const upload = require('../services/multer.service'); 
const { insertUser, viewUser } = require('../controllers/usercontrolleer');
router.post('/insertUser', upload.fields([
    { name: 'aadharImage_front', maxCount: 1 },
    { name: 'aadharImage_back', maxCount: 1 },
    { name: 'addressProofImage', maxCount: 1 },
    { name: 'rentalAgreementImage', maxCount: 1 }
  ]), insertUser);
  router.get('/getUser', viewUser);
module.exports = router;