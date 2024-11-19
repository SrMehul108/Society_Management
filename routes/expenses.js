const express = require('express');
const router = express.Router();
const {insertExpense, viewExpense, editExpense, deleteExpense} = require('../controllers/expensescontroller');
const upload = require('../services/multer.service');

router.post('/insertExpense',upload.fields([{ name: 'uploadBill', maxCount: 1 }]), insertExpense)
module.exports = router