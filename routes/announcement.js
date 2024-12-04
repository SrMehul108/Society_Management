const express = require('express');

const router = express.Router();

const {createAnnouncement, editAnnouncement, viewAnnouncement, deleteAnnouncement} = require('../controllers/announcementcontroller');

router.post('/createAnnouncement', createAnnouncement);
router.get('/viewAnnouncement', viewAnnouncement);
router.post('/editAnnouncement/:id', editAnnouncement);
router.delete('/deleteAnnouncement/:id', deleteAnnouncement);