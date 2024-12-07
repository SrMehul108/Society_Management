const OtherIncome = require("../models/OtherIncome");
const { sendResponse } = require("../services/responseHandler");
const { validateRequest } = require("../services/validation");
const notificationService = require('../services/notificationService');
module.exports.insertIncome = async (req, res) => {
  try {
    validateRequest(req, res);
    if (req.user.societyId) {
      req.body.societyId = req.user.societyId;
      const newData = new OtherIncome(req.body);
      await newData.save();
      if (newData) {
        await notificationService.sendNotification({
          type: 'note',
          message: `New Other Income created: ${newData.title}`,
          societyId: req.user.societyId,
          targetUsers: [],
      });
        return sendResponse(res, 200, "Income inserted successfully", 1, newData);
      }
      return sendResponse(res, 400, "There was an error while saving data", 0); Response(res, 400, "Something went wrong", 0);
    }
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.viewIncome = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const data = await OtherIncome.findOne({ _id: id, societyId: req.user.societyId, isActive: true });
      if (data) {
        return sendResponse(res, 200, "Income viewed successfully", 1, data);
      }
      return sendResponse(res, 400, "Data not found", 0);
    }
    const allData = await OtherIncome.find({ societyId: req.user.societyId, isActive: true, });
    if (allData) return sendResponse(res, 200, "Income viewed successfully", 1, allData);
    return sendResponse(res, 400, "Data not found", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.editIncome = async (req, res) => {
  try {
    validateRequest(req, res);
    const { id } = req.params;
    if (id) {
      req.body.societyId = req.user.societyId;
      let updatedData = await OtherIncome.findByIdAndUpdate(id, req.body, { new: true, });
      if (updatedData) {
        return sendResponse(res, 200, "Income updated successfully", 1, updatedData);
      }
      return sendResponse(res, 400, "Data not found", 0);
    }
    return sendResponse(res, 400, "Invalid Request", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && req.body !== "") {
      req.body.isActive = false;
      let updatedData = await OtherIncome.findByIdAndUpdate(id, req.body, { new: true, });
      if (updatedData) {
        return sendResponse(res, 200, "Income deleted successfully", 1, updatedData);
      }
      return sendResponse(res, 400, "Data not found", 0);
    }
    return sendResponse(res, 400, "Invalid Request", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};
