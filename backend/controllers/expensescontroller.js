const Expenses = require("../models/Expenses");
const cloudinaryConfig = require("../config/cloudinaryConfig");
const { sendResponse } = require("../services/responseHandler");
const { validateRequest } = require("../services/validation");
const notificationService = require('../services/notificationService');
const User = require("../models/UserData");

module.exports.insertExpense = async (req, res) => {
  try {
    validateRequest(req, res);
    if (req.files) {
      if (req.files?.uploadBill?.[0]?.path) {
        req.body.uploadBill = req.files.uploadBill[0].path;
      }
    }
    req.body.societyId = req.user.societyId;
    const newExpense = new Expenses(req.body);
    await newExpense.save();
    if (newExpense) {
      const usersInSociety = await User.find({ societyId: req.user.societyId, role: 'user', isActive: true }).select('_id');
      const targetUserIds = usersInSociety.map(user => user._id);
      await notificationService.sendNotification({
        type: 'expenses',
        message: `New Expenses Added: ${newExpense.title}`,
        societyId: req.user.societyId,
        targetUsers: targetUserIds,
      });
      return sendResponse(res, 200 , "Data Insert Successfully", 1, newExpense);
    }
    return sendResponse(res, 400, "Something went wrong", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.viewExpense = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      let data = await Expenses.findOne({ _id: id });
      if (data) {
        return sendResponse(res, 200, "Data Found Successfully", 1, data);
      }
      return sendResponse(res, 400, "Data not found", 0);
    }
    let alldata = await Expenses.find({ isActive: true, societyId: req.user.societyId, });
    if (alldata) {
      return sendResponse(res, 200, "Data Found Successfully", 1, alldata);
    }
    return sendResponse(res, 400, "Data not found", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.editExpense = async (req, res) => {
  try {
    validateRequest(req, res);
    const { id } = req.params;
    if (id) {
      let existingData = await Expenses.findOne({ _id: id });
      if (existingData) {
        if (req.files) {
          if (req.files?.uploadBill?.[0]?.path) {
            if (existingData.uploadBill) {
              const publicId = existingData.uploadBill.split("/").pop().split(".")[0];
              await cloudinaryConfig.uploader.destroy(`expenseBill/${publicId}`);
            }
            req.body.uploadBill = req.files.uploadBill[0].path;
          }
        }
        let updateData = await Expenses.findByIdAndUpdate(id, req.body, { new: true });
        if (updateData) {
          return sendResponse(res, 200, "Data updated successfully", 1, updateData)
        }
        return sendResponse(res, 400, "Something went wrong", 0);
      }
      return sendResponse(res, 400, "Data not found", 0);
    }
    return sendResponse(res, 400, "Missing Parameter (id)", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let existingData = await Expenses.findOne({ _id: id });
      if (existingData) {
        existingData.isActive = false;
        let updateData = await Expenses.findByIdAndUpdate(id, existingData, { new: true, });
        if (updateData) {
          return sendResponse(res, 200, "Data Deleted Successfully", 1, updateData);
        }
        return sendResponse(res, 400, "Something went wrong", 0);
      }
      return sendResponse(res, 400, "Data not found", 0);
    }
    return sendResponse(res, 400, "Missing Parameter (id)", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};
