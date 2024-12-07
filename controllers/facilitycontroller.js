const Facility = require("../models/Facility");
const { sendResponse } = require("../services/responseHandler");
const { validateRequest } = require("../services/validation");
const notificationService = require('../services/notificationService');
const User = require('../models/UserData');

module.exports.insertFacility = async (req, res) => {
  try {
    validateRequest(req, res);
    req.body.societyId = req.user.societyId;
    const newData = new Facility(req.body);
    await newData.save();
    if (newData) {
      const usersInSociety = await User.find({ societyId: req.user.societyId, role: 'user', isActive: true }).select('_id');
      const targetUserIds = usersInSociety.map(user => user._id);
      await notificationService.sendNotification({
        type: 'facility',
        message: `New Facility created: ${newData.facilityName}`,
        societyId: req.user.societyId,
        targetUsers: [],
      });
      return sendResponse(res, 200, "Facility created successfully", 1, newData);
    }
    return sendResponse(res, 400, "Failed to create facility");
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.viewFacility = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const data = await Facility.findOne({ _id: id, societyId: req.user.societyId, isActive: true });
      if (data) {
        return sendResponse(res, 200, "Facility found successfully", 1, data);
      }
      return sendResponse(res, 400, "Data not found", 0);
    }
    const allData = await Facility.find({ societyId: req.user.societyId, isActive: true });
    if (allData) return sendResponse(res, 200, "Facility found successfully", 1, allData);
    return sendResponse(res, 400, "Data not found", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.editFacility = async (req, res) => {
  try {
    validateRequest(req, res);
    const { id } = req.params;
    if (id) {
      req.body.societyId = req.user.societyId;
      let updatedData = await Facility.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (updatedData) {
        return sendResponse(res, 200, "Facility updated successfully", 1, updatedData);
      }
      return sendResponse(res, 400, "Data not found", 0);
    }
    return sendResponse(res, 400, "Parameter (id) is missing", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && req.body !== "") {
      req.body.isActive = false;
      let updatedData = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (updatedData) {
        return sendResponse(res, 200, "Facility deleted successfully", 1, updatedData);
      }
      return sendResponse(res, 400, "Data not deleted", 0);
    }
    return sendResponse(res, 400, "Parameter (id) is missing", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};
