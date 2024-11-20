const express = require('express');
const router = express.Router();
const { insertNote, viewNote, editNote, deleteNote } = require('../controllers/notecontroller');

router.post('/insertNote', insertNote);
router.get('/viewNote', viewNote);
router.post('/editNote', editNote);
router.delete('/deleteNote', deleteNote)
module.exports = router;