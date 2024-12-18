const UserModel = require("../models/UserData");
const mongoose = require("mongoose");
const Member = require("../models/Member");
const Vehicle = require("../models/Vehicle");
const Maintenance = require("../models/Maintenance");
const { regestration } = require("../services/emailtemplate");
const { validateRequest } = require("../services/validation");
const { sendResponse } = require("../services/responseHandler");
const cloudinaryConfig = require("../config/cloudinaryConfig");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Payment = require("../models/Payment");

module.exports.insertUser = async (req, res) => {
  try {
    validateRequest(req, res);
    const existingUser = await UserModel.findOne({
      $or: [{ email: req.body.email }, { phoneNo: req.body.phoneNo }]
    });
    if (existingUser) {
      const wingValidation = await UserModel.findOne({
        societyId: req.user.societyId,
        role: "user",
        wing: req.body.wing,
        unit: req.body.unit,
        _id: { $ne: existingUser._id },
      });
      if (wingValidation) {
        return sendResponse(res, 400, "On selected Wing & unit, there is already a resident", 0);
      }
      return sendResponse(res, 400, "Email or phone number already exists", 0);
    }
    // Generate secure password
    const password = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);
    // Prepare user data
    const data = {
      fullName: req.body.fullName,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      societyId: req.user.societyId,
      password: hashedPassword,
      role: "user",
      metaData: {
        wing: req.body.wing || null,
        unit: req.body.unit || null,
        type: req.body.type || null,
        relation: req.body.relation || null,
      },
    };
    // Parse JSON inputs
    let members = [];
    let vehicles = [];
    let owner;

    try {
      if (req.body.members) {
        if (typeof req.body.members === "string") {
          members = JSON.parse(req.body.members);
        } else {
          members = req.body.members;
        }
        if (!Array.isArray(members)) members = [members];
      }

      if (req.body.vehicles) {
        if (typeof req.body.vehicles === "string") {
          vehicles = JSON.parse(req.body.vehicles);
        } else {
          vehicles = req.body.vehicles;
        }
        if (!Array.isArray(vehicles)) vehicles = [vehicles];
      }

      if (req.body.owner && data.metaData.type === "tenant") {
        if (typeof req.body.owner === "string") {
          owner = JSON.parse(req.body.owner);
        } else {
          owner = req.body.owner;
        }
      }
    } catch (err) {
      return sendResponse(res, 400, "Invalid JSON format", 0);
    }

    if (owner) data.metaData.owner = owner;
    // File uploads
    if (req.files) {
      data.profile_image = req.files?.profile_image?.[0]?.path || null;
      data.metaData.aadharImage_front = req.files?.aadharImage_front?.[0]?.path || null;
      data.metaData.aadharImage_back = req.files?.aadharImage_back?.[0]?.path || null;
      data.metaData.addressProofImage = req.files?.addressProofImage?.[0]?.path || null;
      data.metaData.rentalAgreementImage = req.files?.rentalAgreementImage?.[0]?.path || null;
    }
    // Create user and related entities
    const session = await mongoose.startSession();
    session.startTransaction();

    const newUser = await UserModel.create([data], { session });
    const maintenanceData = await Maintenance.findOne({
      societyId: req.user.societyId,
    });
    if (maintenanceData) {
      const insertPayment = { type: "maintenance", amount: maintenanceData.amount, UserId: newUser[0]._id, };
      await Payment.create(insertPayment);
    }
    if (members) {
      const insertedMembers = await Member.insertMany(
        members.map((m) => ({ ...m, userId: newUser[0]._id })),
        { session }
      );
      newUser[0].metaData.members = insertedMembers.map((m) => m._id);
    }

    if (vehicles) {
      const insertedVehicles = await Vehicle.insertMany(
        vehicles.map((v) => ({ ...v, userId: newUser[0]._id })),
        { session }
      );
      newUser[0].metaData.vehicles = insertedVehicles.map((v) => v._id);
    }

    await newUser[0].save({ session });
    await session.commitTransaction();
    session.endSession();
    // Send registration email
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
      });
      const htmlMessage = regestration(req.body.fullName, req.body.email, password);
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Registration Successful ✔",
        text: `Hello ${req.body.fullName}, You've successfully registered.`,
        html: htmlMessage,
      });
    } catch (emailError) {
      return sendResponse(res, 500, "User registered, but email sending failed", 0);
    }
    return sendResponse(res, 200, "User Registered Successfully", 1, newUser[0]);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.viewUser = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      // Fetching user by ID
      const userdata = await UserModel.findOne({ _id: id, societyId: req.user.societyId, role: "user" }).populate(["metaData.members", "metaData.vehicles"]).exec();

      if (userdata) {
        const formattedData = {
          ...userdata.toObject(),
          metaData: {
            ...userdata.metaData,
            members: userdata.metaData.members?.map((member) => ({
              id: member._id,
              name: member.name,
              age: member.age,
            })),
            vehicles: userdata.metaData.vehicles?.map((vehicle) => ({
              id: vehicle._id,
              model: vehicle.model,
              registrationNo: vehicle.registrationNo,
            })),
          },
        };
        return sendResponse(res, 200, "User fetched successfully", 1, formattedData);
      } else {
        return sendResponse(res, 400, "User not found", 0, []);
      }
    }

    // Fetch all users
    const userData = await UserModel.find({ societyId: req.user.societyId, isActive: true, role: "user" });

    if (userData && userData.length > 0) {
      const formattedData = userData.map((user) => ({
        ...user.toObject(),
        members: user.metaData.members?.length || 0,
        vehicles: user.metaData.vehicles?.length || 0,
      }));
      return sendResponse(res, 200, "User fetched successfully", 1, formattedData);
    } else {
      return sendResponse(res, 400, "User not found", 0, []);
    }
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.editUser = async (req, res) => {
  try {
    validateRequest(req, res);
    const { id } = req.params;
    if (id) {
      const existingData = await UserModel.findOne({ _id: id, societyId: req.user.societyId, role: "user" });
      if (existingData) {
        if (req.body.wing && req.body.unit && (req.body.wing !== existingData.wing || req.body.unit !== existingData.unit)) {
          const wingValidation = await UserModel.findOne({ societyId: req.user.societyId, role: "user", wing: req.body.wing, unit: req.body.unit });
          if (wingValidation && existingData._id !== wingValidation._id) {
            return sendResponse(res, 400, "On selected Wing & unit, there is already a resident", 0);
          }
        }
        const data = {
          fullName: req.body.fullName,
          phoneNo: req.body.phoneNo,
          email: req.body.email,
          age: req.body.age,
          gender: req.body.gender,
          societyId: req.user.societyId,
          role: "user",
          metaData: {
            wing: req.body.wing || existingData.metaData.wing,
            unit: req.body.unit || existingData.metaData.unit,
            type: req.body.type || existingData.metaData.type,
          },
        };
        let owner;
        if (req.body.owner && data.metaData.type === "tenant") {
          try {
            owner = JSON.parse(req.body.owner);
          } catch (err) {
            return sendResponse(res, 400, "Invalid owner data", 0);
          }
        }
        if (owner) data.metaData.owner = owner;

        if (req.body.members && req.body.members.length > 0) {
          const members = JSON.parse(req.body.members);
          const updatedMemberIds = [];
          for (let member of members) {
            if (member._id) {
              await Member.findByIdAndUpdate(member._id, member);
              updatedMemberIds.push(member._id);
            } else {
              const existingMember = await Member.findOne({ email: member.email });
              if (existingMember) {
                return sendResponse(400, "Member already exists", 0);
              }
              const newMember = new Member({ ...member, UserId: id });
              const savedMember = await newMember.save();
              updatedMemberIds.push(savedMember._id);
            }
          }
          data.metaData.members = updatedMemberIds;
        }
        if (req.body.vehicles && req.body.vehicles.length > 0) {
          const vehicles = JSON.parse(req.body.vehicles);
          const updatedVehicleIds = [];
          for (let vehicle of vehicles) {
            if (vehicle._id) {
              await Vehicle.findByIdAndUpdate(vehicle._id, vehicle);
              updatedVehicleIds.push(vehicle._id);
            } else {
              const existingVehicle = await Vehicle.findOne({ vehicleNumber: vehicle.vehicleNumber, });
              if (existingVehicle) {
                return sendResponse(400, "Vehicle already exists", 0);
              }
              const newVehicle = new Vehicle({ ...vehicle, UserId: id });
              const savedVehicle = await newVehicle.save();
              updatedVehicleIds.push(savedVehicle._id);
            }
          }
          data.metaData.vehicles = updatedVehicleIds;
        }
        if (req.files) {
          if (req.files?.profile_image?.[0]?.path) {
            if (existingData.metaData.profile_image) {
              const publicId = existingData.profile_image
                .split("/")
                .pop()
                .split(".")[0];
              await cloudinaryConfig.uploader.destroy(
                `profileImages/${publicId}`
              );
            }
            data.profile_image = req.files.profile_image[0].path;
          }
          if (req.files?.aadharImage_front?.[0]?.path) {
            if (existingData.metaData.aadharImage_front) {
              const publicId = existingData.aadharImage_front
                .split("/")
                .pop()
                .split(".")[0];
              await cloudinaryConfig.uploader.destroy(
                `aadharImages/${publicId}`
              );
            }
            data.metaData.aadharImage_front =
              req.files.aadharImage_front[0].path;
          }
          if (req.files?.aadharImage_back?.[0]?.path) {
            if (existingData.metaData.aadharImage_back) {
              const publicId = existingData.aadharImage_back
                .split("/")
                .pop()
                .split(".")[0];
              await cloudinaryConfig.uploader.destroy(
                `aadharImages/${publicId}`
              );
            }
            data.metaData.aadharImage_back =
              req.files.aadharImage_back[0].path;
          }
          if (req.files?.addressProofImage?.[0]?.path) {
            if (existingData.metaData.addressProofImage) {
              const publicId = existingData.addressProofImage
                .split("/")
                .pop()
                .split(".")[0];
              await cloudinaryConfig.uploader.destroy(
                `addressProofImages/${publicId}`
              );
            }
            data.metaData.addressProofImage =
              req.files.addressProofImage[0].path;
          }
          if (req.files?.rentalAgreementImage?.[0]?.path) {
            if (existingData.metaData.rentalAgreementImage) {
              const publicId = existingData.rentalAgreementImage
                .split("/")
                .pop()
                .split(".")[0];
              await cloudinaryConfig.uploader.destroy(
                `rentalAgreementImages/${publicId}`
              );
            }
            data.metaData.rentalAgreementImage =
              req.files.rentalAgreementImage[0].path;
          }
        }
        const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
          new: true,
        });
        if (updatedUser) {
          return sendResponse(
            res,
            400,
            "User updated successfully",
            1,
            updatedUser
          );
        } else {
          return sendResponse(res, 400, "User data Not Found", 0);
        }
      } else {
        return sendResponse(res, 400, "User data Not Found", 0);
      }
    } else {
      return sendResponse(res, 400, "Parameter id is Missing", 0);
    }
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    var { id } = req.params;
    if (id) {
      const userData = await UserModel.findOne({
        _id: id,
        societyId: req.user.societyId,
        role: "user",
      });
      if (userData) {
        userData.isActive = false;
        const updateData = await UserModel.findByIdAndUpdate(id, userData, {
          new: true,
        });
        if (updateData) {
          return sendResponse(res, 200, "User Vacate Successfully", 1, updateData);
        }
        return sendResponse(res, 400, "data Not Updated", 0);
      }
      return sendResponse(res, 404, "User data Not Found", 0);
    }
    return sendResponse(res, 400, "Parameter id is Missing", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.addNewSecurity = async (req, res) => {
  try {
    if (req.body !== "") {
      const existingUser = await UserModel.findOne({ email: req.body.email });
      if (existingUser) {
        return sendResponse(res, 400, "Email Already Exist", 0);
      }
      const password = crypto.randomBytes(8).toString("hex");
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = {
        fullName: req.body.fullName,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        securityData: {
          shift: req.body.shift,
          shiftDate: req.body.shiftDate,
          shiftTime: req.body.shiftTime,
        },
        societyId: req.user.societyId,
        role: req.body.role ? req.body.role : "security",
        password: hashedPassword,
        metaData: {},
      };

      if (req.files) {
        if (req.files?.profile_image?.[0]?.path) {
          data.profile_image = req.files.profile_image[0].path;
        }
        if (req.files?.aadharImage_front?.[0]?.path) {
          data.metaData.aadharImage_front = req.files.aadharImage_front[0].path;
        }
      }
      const newUser = new UserModel(data);
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
        const htmlMessage = regestration(
          req.body.fullname,
          req.body.email,
          password
        );
        const info = await transporter.sendMail({
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Registration Successful ✔",
          text: `Hello ${req.body.fullname}, You've Successfully Registered. You can now log in with Email: ${req.body.email}, Password: ${password}.`,
          html: htmlMessage,
        });
        return sendResponse(res, 200, "Security Guard Registered Successfully", 1, newUser);
      }
      return sendResponse(res, 400, "Something went wrong", 0);
    }
    return sendResponse(res, 400, "No data Found", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.viewSecurity = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const userdata = await UserModel.findOne({
        _id: id,
        societyId: req.user.societyId,
        role: "security",
      });
      if (userdata) {
        return sendResponse(res, 200, "Security Guard Found", 1, userdata);
      } else {
        return sendResponse(res, 400, "Security Guard Not Found", 0, []);
      }
    }
    const userData = await UserModel.find({
      societyId: req.user.societyId,
      isActive: true,
      role: "security",
    });
    if (userData && userData.length > 0) {
      return sendResponse(res, 200, "Security Guards Found", 1, userData);
    } else {
      return sendResponse(res, 400, "No Gaurd Found", 0, []);
    }
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.editSecurity = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      if (req.body) {
        const existingData = await UserModel.findOne({
          _id: id,
          societyId: req.user.societyId,
          role: "security",
        });
        if (existingData) {
          const data = {
            fullName: req.body.fullName,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            age: req.body.age,
            gender: req.body.gender,
            shift: req.body.shift,
            shiftDate: req.body.shiftDate,
            shiftTime: req.body.shiftTime,
          };
          if (req.files) {
            if (req.files?.profile_image?.[0]?.path) {
              if (existingData.profile_image) {
                const publicId = existingData.profile_image
                  .split("/")
                  .pop()
                  .split(".")[0];
                await cloudinaryConfig.uploader.destroy(
                  `profileImages/${publicId}`
                );
              }
              data.profile_image = req.files.profile_image[0].path;
            }
            if (req.files?.aadharImage_front?.[0]?.path) {
              if (existingData.aadharImage_front) {
                const publicId = existingData.aadharImage_front
                  .split("/")
                  .pop()
                  .split(".")[0];
                await cloudinaryConfig.uploader.destroy(
                  `aadharImages/${publicId}`
                );
              }
              data.aadharImage_front = req.files.aadharImage_front[0].path;
            }
          }
          const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
            new: true,
          });
          if (updatedUser) {
            return sendResponse(200, "User updated successfully", 1, updatedUser);
          }
          return sendResponse(res, 400, "Data Not updated", 0);
        }
        return sendResponse(res, 400, "Data Not Found", 0);
      }
      return sendResponse(res, 400, "Data is Missing", 0);
    }
    return sendResponse(res, 400, "Parameter id is Missing", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.deleteSecurity = async (req, res) => {
  try {
    var { id } = req.params;
    if (id) {
      const userData = await UserModel.findOne({
        _id: id,
        societyId: req.user.societyId,
        role: "security",
      });
      if (userData) {
        userData.isActive = false;
        const updateData = await UserModel.findByIdAndUpdate(id, userData, {
          new: true,
        });
        if (updateData) {
          return sendResponse(res, 200, "Security deleted successfully", 1, updateData);
        }
        return sendResponse(res, 400, "Security Not deleted", 0);
      }
      return sendResponse(res, 404, "Security Not Found", 0);
    }
    return sendResponse(res, 400, "Parameter id is Missing", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};
