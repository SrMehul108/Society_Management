const express = require('express');
const router = express.Router();
const { insertIncome, viewIncome, editIncome, deleteIncome } = require('../controllers/otherincomecontroller');

router.post('/insertIncome', insertIncome);
router.get('/getIncome', viewIncome);
router.post('/editIncome/:id', editIncome);
router.delete('/deleteIncome/:id', deleteIncome);
module.exports = router;