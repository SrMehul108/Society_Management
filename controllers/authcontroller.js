const UserModel = require("../models/UserData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cloudinaryConfig = require("../config/cloudinaryConfig");
const { sendResponse } = require("../services/responseHandler");
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
          let token = await jwt.sign({ userData: checkmail },process.env.JWT_SECRET_ADMIN,{ expiresIn: "1d" });
          
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
          if ( req.body.password !== "" && req.body.password === req.body.confirmPassword) {
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
    if (req.user) {
      let olddata = await UserModel.findOne({ _id: req.user._id });
      if (req.body == "") {
        return sendResponse(res, 400, "Something went wrong", 0);
      }
      if (req.files) {
        if (req.files?.profile_image?.[0]?.path) {
          if (olddata.profile_image) {
            const publicId = olddata.profile_image
              .split("/")
              .pop()
              .split(".")[0];
            await cloudinaryConfig.uploader.destroy(`adminImages/${publicId}`);
          }
          req.body.profile_image = req.files.profile_image[0].path;
        }
      }
      const updatedData = await UserModel.findByIdAndUpdate(
        req.user._id,
        req.body,
        { new: true }
      );
      if (updatedData) {
        return sendResponse(res, 200, "Data Updated Successfully", 1, updatedData);
      }
      return sendResponse(res, 400, "Something went wrong", 0);
    }
    return sendResponse(res, 400, "UnAuthorized", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};
