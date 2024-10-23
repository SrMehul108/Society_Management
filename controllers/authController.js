const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports.registerUser = async (req, res) => {
    try {
        if (req.body !== "") {
            if (req.body.password !== "" && req.body.password === req.body.confirmPassword) {
                let checkmail = await User.findOne({ email: req.body.email });
                if (checkmail) {
                    return res.status(400).json({ message: "Email Already Exists", status: 0 });
                } else {
                    let pass = await bcrypt.hash(req.body.password, 10);
                    req.body.password = pass;
                    let newUser = new User(req.body);
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
                        return res.status(200).json({ message: "User Registered Successfully", status: 1, data: newUser });
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
            let checkmail = await User.findOne({ email: req.body.email });
            if (checkmail) {
                var secretKey = checkmail.role === "admin" ? process.env.JWT_SECRET_ADMIN : process.env.JWT_SECRET_USER;
                let pass = await bcrypt.compare(req.body.password, checkmail.password);
                if (pass) {
                    let token = await jwt.sign({ userData: checkmail }, secretKey, { expiresIn: '1d' });
                    return res.status(200).json({ message: "You're Logged In Successfully 🎉", status: 1, data: token });
                } else {
                    return res.status(400).json({ message: "Password is Incorrect", status: 0 });
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
        if (req.body !== "") {
            let checkmail = await User.findOne({ email: req.body.email });
            if (checkmail) {
                const Otp = Math.floor(100000 + Math.random() * 900000);
                res.cookie('otp', Otp, { httpOnly: true, secure: true });
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
                const info = await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: req.cookies.email,
                    subject: "Forgot Password OTP ✔",
                    text: `Hello ${checkmail.name}`,
                    html: `<p>You're OTP is ${Otp}</p>`,
                })
                return res.status(200).json({ message: "OTP Sent Successfully 🎉", status: 1 });
            } else {
                return res.status(400).json({ message: "Email is Incorrect", status: 0 });
            }
        } else {
            return res.status(400).json({ message: "Data Not Found", status: 0 });
        }
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
                return res.status(400).json({ message: "OTP is Incorrect", status: 0 });
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
            let checkmail = await User.findOne({ email: req.cookies.email });
            if (checkmail) {
                if (req.body.password !== "" && req.body.password === req.body.confirmPassword) {
                    let pass = await bcrypt.hash(req.body.password, 10);
                    req.body.password = pass;
                    await User.findByIdAndUpdate(checkmail._id, req.body);
                    return res.status(200).json({ message: "Password Reset Successfully 🎉", status: 1 });
                } else {
                    return res.status(400).json({ message: "Password and Confirm Password is Not Matched", status: 0 });
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
