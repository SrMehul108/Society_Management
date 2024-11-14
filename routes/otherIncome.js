const express = require('express');
const router = express.Router();
const { insertIncome, viewIncome, editIncome, deleteIncome } = require('../controllers/otherincomecontroller');

router.post('/insertIncome', insertIncome);
router.get('/getIncome', viewIncome);
router.post('/editIncome', editIncome);
router.delete('/deleteIncome', deleteIncome);
module.exports = router;