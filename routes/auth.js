const express = require('express');
const router = express.Router();
const Passport = require("passport");
const upload = require('../services/multer.service');
const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword, editProfile } = require('../controllers/authcontroller');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.use('/admin', (req, res, next) => {
    Passport.authenticate('jwt', (err, user, info) => { if (err || !user) { return res.status(403).json({ message: 'Authorization failed' }); } req.user = user; next(); })(req, res, next);
}, require('./admin'));
router.post('/edit-profile', Passport.authenticate('jwt', { failureMessage: 'You are not logged in' }), upload.fields([{ name: 'profile_image', maxCount: 1 }]), editProfile);
module.exports = router;