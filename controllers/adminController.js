const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports.registerUser = async (req, res) => {
    try {
        if (req.body !== "") {
            if (req.body.password !== "" && req.body.password === req.body.confirmPassword) {
                let checkmail = await Admin.findOne({ email: req.body.email });
                if (checkmail) {
                    return res.status(400).json({ message: "Email Already Exists", status: 0 });
                } else {
                    let pass = await bcrypt.hash(req.body.password, 10);
                    req.body.password = pass;
                    let newUser = new Admin(req.body);
                    await newUser.save();
                    if (newUser) {
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 465,
                            secure: true,
                            auth: {
                                user: process.env.EMAIL,
                                pass: process.env.PASSWORD,
                            },
                        });
                        const info = await transporter.sendMail({
                            from: process.env.EMAIL,
                            to: req.body.email,
                            subject: "Registration Successful ✔",
                            text: `Hello ${req.body.name}`,
                            html: `<p>You've Successfully Registered</p><br><p>You can now log in with your email address.</p>`,
                        })
                        return res.status(200).json({ message: "Admin Registered Successfully", status: 1, data: newUser });
                    } else {
                        console.log(error.message);
                        return res.status(400).json({ message: "Something Wrong", status: 0 });
                    }
                }
            } else {
                return res.status(400).json({ message: "Password and Confirm Password is Not Matched", status: 0 });
            }
        } else {
            return res.status(400).json({ message: "Data Not Found", status: 0 });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        if (req.body !== "") {
            let checkmail = await Admin.findOne({ email: req.body.email });
            if (checkmail) {
                let pass = await bcrypt.compare(req.body.password, checkmail.password);
                if (pass) {
                    let token = await jwt.sign({ userData: checkmail }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1d' });
                    return res.status(200).json({ message: "You're Logged In Successfully 🎉", status: 1, data: token });
                } else {
                    return res.status(400).json({ message: "Incorrect password", status: 0 });
                }
            } else {
                return res.status(400).json({ message: "Email is Incorrect", status: 0 });
            }
        } else {
            return res.status(400).json({ message: "Data Not Found", status: 0 });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({ message: "Email is required", status: 0 });
        }
        const checkmail = await Admin.findOne({ email: req.body.email });
        if (!checkmail) {
            return res.status(400).json({ message: "Email is incorrect", status: 0 });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        res.cookie('otp', otp, { httpOnly: true, secure: true });
        res.cookie('email', checkmail.email, { httpOnly: true, secure: true });

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: checkmail.email, // Use checkmail.email instead of req.cookies.email
            subject: "Forgot Password OTP ✔",
            text: `Hello ${checkmail.name}`,
            html: `<p>Your OTP is ${otp}</p>`,
        });

        return res.status(200).json({ message: "OTP Sent Successfully 🎉", status: 1 });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.verifyOtp = async (req, res) => {
    try {
        if (req.body !== "") {
            if (req.body.otp == req.cookies.otp) {
                return res.status(200).json({ message: "OTP Verified Successfully 🎉", status: 1 });
            } else {
                return res.status(400).json({ message: "Wrong OTP Entered", status: 0 });
            }
        } else {
            return res.status(400).json({ message: "Data Not Found", status: 0 });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Something Wrong", status: 0 });

    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        if (req.body !== "") {
            let checkmail = await Admin.findOne({ email: req.cookies.email });
            if (checkmail) {
                const isSamePassword = await bcrypt.compare(req.body.password, checkmail.password);
                if (isSamePassword) {
                    return res.status(400).json({ message: "New password must be different from the current password", status: 0 });
                } else {
                    if (req.body.password !== "" && req.body.password === req.body.confirmPassword) {
                        let pass = await bcrypt.hash(req.body.password, 10);
                        req.body.password = pass;
                        await Admin.findByIdAndUpdate(checkmail._id, req.body);
                        return res.status(200).json({ message: "Password Reset Successfully 🎉", status: 1 });
                    } else {
                        return res.status(400).json({ message: "Password and Confirm Password is Not Matched", status: 0 });
                    }
                }
            } else {
                return res.status(400).json({ message: "Email is Incorrect", status: 0 });
            }
        } else {
            return res.status(400).json({ message: "Data Not Found", status: 0 });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Something Wrong", status: 0 });
    }
}
