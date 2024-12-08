const UserModel = require("../models/UserData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cloudinaryConfig = require("../config/cloudinaryConfig");
const { sendResponse } = require("../services/responseHandler");
const { validateRequest } = require("../services/validation");
const Expenses = require('../models/Expenses');
const Income = require("../models/OtherIncome");
const User = require('../models/UserData');
const Payment = require("../models/Payment");
const Maintenance = require("../models/Maintenance");
this.OTP = "";

module.exports.registerUser = async (req, res) => {
  try {
    if (req.body !== "") {
      if (req.body.password !== "" && req.body.password === req.body.confirmPassword) {
        let checkmail = await UserModel.findOne({ email: req.body.email });
        if (checkmail) {
          return sendResponse(res, 400, "Email Already Exists", 0);
        } else {
          let pass = await bcrypt.hash(req.body.password, 10);
          req.body.password = pass;
          let newUser = new UserModel(req.body);
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
            });
            return sendResponse(res, 200, "Admin Registered Successfully", 1, newUser);
          } else {
            return sendResponse(res, 400, "Something went wrong", 0);
          }
        }
      } else {
        return sendResponse(res, 400, "Password and Confirm Password is Not Matched", 0);
      }
    } else {
      return sendResponse(res, 400, "Data Not Found", 0);
    }
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    if (req.body !== "") {
      let checkmail = await UserModel.findOne({ email: req.body.email });
      if (checkmail) {
        let pass = await bcrypt.compare(req.body.password, checkmail.password);
        if (pass) {
          let token = await jwt.sign(
            { userData: checkmail },
            checkmail.role === 'admin' ? process.env.JWT_SECRET_ADMIN : checkmail.role === 'security' ? process.env.JWT_SECRET_SECURITY : process.env.JWT_SECRET_USER,
            { expiresIn: "1d" }
          );

          return res.status(200).json({ message: "You're Logged In Successfully 🎉", status: 1, data: token, role: checkmail.role, });
        } else {
          return sendResponse(res, 400, "Invalid Password", 0);
        }
      } else {
        return sendResponse(res, 400, "Email is Incorrect", 0);
      }
    } else {
      return sendResponse(res, 400, "Data Not Found", 0);
    }
  } catch (error) {
    console.log(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return sendResponse(res, 400, "Email is Required", 0);
    }
    const checkmail = await UserModel.findOne({ email: req.body.email });
    if (!checkmail) {
      return sendResponse(res, 400, "Email is Incorrect", 0);
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    res.cookie("otp", otp, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
    this.OTP = otp;
    res.cookie("email", checkmail.email);

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
      to: checkmail.email,
      subject: "Forgot Password OTP ✔",
      text: `Hello ${checkmail.name}`,
      html: `<p>Your OTP is ${otp}</p>`,
    });

    return sendResponse(res, 200, "OTP Sent Successfully", 1);
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    if (req.body !== "") {
      let sendedOtp = req.cookies.otp ? req.cookies.otp : this.OTP;
      if (req.body.otp == sendedOtp) {
        this.OTP = "";
        return sendResponse(res, 200, "OTP Verified Successfully 🎉", 1);
      } else {
        return sendResponse(res, 400, "Invalid OTP", 0);
      }
    } else {
      return sendResponse(res, 400, "Data Not Found", 0);
    }
  } catch (error) {
    console.log(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    if (req.body !== "") {
      let checkmail = await UserModel.findOne({ email: req.body.email });
      if (checkmail) {
        const isSamePassword = await bcrypt.compare(
          req.body.password,
          checkmail.password
        );
        if (isSamePassword) {
          return sendResponse(res, 400, "New password must be different from the current password", 0);
        } else {
          if (req.body.password !== "" && req.body.password === req.body.confirmPassword) {
            let pass = await bcrypt.hash(req.body.password, 10);
            req.body.password = pass;
            await UserModel.findByIdAndUpdate(checkmail._id, req.body);
            return sendResponse(res, 200, "Password Reset Successfully 🎉", 1);
          } else {
            return sendResponse(res, 400, "Password and Confirm Password must be same", 0);
          }
        }
      } else {
        return sendResponse(res, 400, "Email is Incorrect", 0);
      }
    } else {
      return sendResponse(res, 400, "Data Not Found", 0);
    }
  } catch (error) {
    console.log(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.editProfile = async (req, res) => {
  try {
    if (!req.user) {
      sendResponse(res, 403, "Unauthorized Access", 0);
    }
    let olddata = await UserModel.findOne({ _id: req.user._id });
    if (req.body == "") {
      return sendResponse(res, 400, "Something went wrong", 0);
    }
    if (req.files) {
      if (req.files?.profile_image?.[0]?.path) {
        if (olddata.profile_image) {
          const publicId = olddata.profile_image.split("/").pop().split(".")[0];
          await cloudinaryConfig.uploader.destroy(`adminImages/${publicId}`);
        }
        req.body.profile_image = req.files.profile_image[0].path;
      }
    }
    const updatedData = await UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (updatedData) {
      return sendResponse(res, 200, "Data Updated Successfully", 1, updatedData);
    }
    return sendResponse(res, 400, "Something went wrong", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.SocietyFinanceDetail = async (req, res) => {
  try {
    if (!req.user) {
      return sendResponse(res, 403, "Unauthorized Access", 0);
    }
    const totalExpenses = await Expenses.aggregate([
      { $match: { societyId: req.user.societyId, isActive: true } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);
    const totalIncome = await Income.aggregate([
      { $match: { societyId: req.user.societyId, isActive: true } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);
    const income = await Income.find({ societyId: req.user.societyId, isActive: true });
    const unitCount = await User.countDocuments({ societyId: req.user.societyId, isActive: true, role: 'user' });
    const totalExpenAmount = totalExpenses.length > 0 ? totalExpenses[0].totalAmount : 0;
    const totalIncomeAmount = totalIncome.length > 0 ? totalIncome[0].totalAmount : 0;
    const balance = totalIncomeAmount - totalExpenAmount;
    const data = {
      balance,
      totalIncomeAmount,
      totalExpenAmount,
      unitCount
    }
    return sendResponse(res, 200, "Data Retrieved Successfully", 1, data);
  } catch (error) {
    return sendResponse(500, "Internal Server Error", 0)
  }
}

module.exports.PendingMaintenanceList = async (req, res) => {
  try {
    const users = await UserModel.find({ societyId: req.user.societyId, isActive: true, role: 'user' });
    if (!users || users.length === 0) {
      return sendResponse(res, 404, "No Users Found", 0);
    }

    const currentDate = new Date();
    const updatedPayments = [];

    for (const user of users) {
      const payments = await Payment.find({ UserId: user._id, type: 'maintenance', paymentStatus: false }).populate('UserId', 'fullName');
      for (const payment of payments) {
        const maintenance = await Maintenance.findOne({ societyId: user.societyId, isActive: true });
        if (maintenance) {
          const dueDate = new Date(maintenance.dueDate);
          const penaltyDays = maintenance.penaltyDay;
          let calculatedAmount = parseInt(payment.amount); // Ensure payment.amount is treated as an integer

          // Check if the due date has passed
          if (currentDate > dueDate) {
            const daysOverdue = Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24));
            if (daysOverdue > penaltyDays) {
              const penaltyAmount = parseInt(maintenance.penaltyAmount); // Ensure penaltyAmount is treated as an integer
              calculatedAmount += penaltyAmount; // Calculate the new amount without updating the payment
            }
          }
          updatedPayments.push({ user: user.fullName, amount: calculatedAmount }); // Only push username and calculated amount
        }
      }
    }

    return sendResponse(res, 200, "Pending Maintenance List Retrieved Successfully", 1, updatedPayments);
  } catch (error) {
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
}