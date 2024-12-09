const express = require('express');
const router = express.Router();
const {insert, viewImportnat, editImportant, deleteImportant} = require('../controllers/importantcontroller');

router.post('/insertImportant', insert);
router.get('/getImportant', viewImportnat);
router.post('/editImportant/:id', editImportant);
router.delete('/deleteImportant/:id', deleteImportant);
module.exports = router;