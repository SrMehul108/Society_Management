const express = require('express');
const router = express.Router();
const { insertNote, viewNote, editNote, deleteNote } = require('../controllers/notecontroller');

router.post('/insertNote', insertNote);
router.get('/viewNote', viewNote);
router.post('/editNote/:id', editNote);
router.delete('/deleteNote/:id', deleteNote)
module.exports = router;