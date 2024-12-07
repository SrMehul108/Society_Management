const Important = require("../models/Important");
const { sendResponse } = require("../services/responseHandler");
const { validateRequest } = require("../services/validation");
const notificationService = require('../services/notificationService');
module.exports.insert = async (req, res) => {
  try {
    validateRequest(req, res);
    let check = await Important.findOne({ phoneNo: req.body.phoneNo });
    if (check) {
      return sendResponse(res, 400, "Phone number already exists", 0);
    }
    req.body.societyId = req.user.societyId;
    let newData = new Important(req.body);
    await newData.save();
    if (newData) {
      await notificationService.sendNotification({
        type: 'important number',
        message: `New Number Added: ${newData.phoneNo}`,
        societyId: req.user.societyId,
        targetUsers: [],
    });
      return sendResponse(res, 200, "Important contact saved successfully", 1, newData);
    }
    return sendResponse(res, 400, "Something Wrong", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.viewImportnat = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      let data = await Important.findOne({ _id: id });
      if (data) {
        return sendResponse(res, 200, "Important contact found successfully", 1, data);
      }
      return sendResponse(res, 400, "Data Not Found", 0);
    }
    const data = await Important.find({
      isActive: true,
      societyId: req.user.societyId,
    });
    if (data) {
      return sendResponse(res, 200, "Important contact found successfully", 1, data);
    }
    return sendResponse(res, 400, "Data Not Found", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.editImportant = async (req, res) => {
  try {
    validateRequest(req, res);
    const { id } = req.params;
    if (id) {
      let existingData = await Important.findOne({ _id: id });
      if (existingData) {
        let check = await Important.findOne({ phoneNo: req.body.phoneNo });
        if (check) {
          return sendResponse(res, 400, "Phone Number Already Exist", 0);
        }
        const updatedData = await Important.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (updatedData) {
          return sendResponse(res, 200, "Important contact updated successfully", 1, updatedData);
        }
        return sendResponse(res, 400, "Something Went wrong", 0);
      }
      return sendResponse(res, 400, "Data Not Found", 0);
    }
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.deleteImportant = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let data = await Important.findOne({ _id: id });
      if (data) {
        data.isActive = false;
        const updatedData = await Important.findByIdAndUpdate(id, data, {
          new: true,
        });
        if (updatedData) {
          return sendResponse(res, 200, "Important contact deleted successfully", 1, updatedData);
        }
        return sendResponse(res, 400, "Something Went wrong", 0);
      }
      return sendResponse(res, 400, "Data Not Found", 0);
    }
    return sendResponse(res, 400, "Parameter (Id) is missing", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};
