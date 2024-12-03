const Facility = require("../models/Facility");
const { sendResponse } = require("../services/responseHandler");

module.exports.insertFacility = async (req, res) => {
  try {
    if (req.body) {
      if (req.user.societyId) {
        req.body.societyId = req.user.societyId;
        const newData = new Facility(req.body);
        await newData.save();
        if (newData) {
          return res.status(200).json({
            message: "Facility added successfully",
            status: 1,
            data: newData,
          });
        }
        return sendResponse(
          res,
          400,
          "There was an error while saving data",
          0
        );
      }
      return sendResponse(res, 400, "Unauthorized", 0);
    } else {
      return sendResponse(res, 400, "Something went wrong", 0);
    }
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.viewFacility = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const data = await Facility.findOne({
        _id: id,
        societyId: req.user.societyId,
        isActive: true,
      });
      if (data) {
        return res.status(200).json({
          message: "Data fetched successfully",
          status: 1,
          data: data,
        });
      }
      return sendResponse(res, 400, "Data not found", 0);
    }
    const allData = await Facility.find({
      societyId: req.user.societyId,
      isActive: true,
    });
    if (allData)
      return res.status(200).json({
        message: "Data fetched successfully",
        status: 1,
        data: allData,
      });
    return sendResponse(res, 400, "Data not found", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.editFacility = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && req.body !== "") {
      req.body.societyId = req.user.societyId;
      let updatedData = await Facility.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (updatedData) {
        return res.status(200).json({
          message: "Data Update Successfully",
          status: 1,
          data: updatedData,
        });
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
        return res.status(200).json({
          message: "Data Delete Successfully",
          status: 1,
          data: updatedData,
        });
      }
      return sendResponse(res, 400, "Data not deleted", 0);
    }
    return sendResponse(res, 400, "Parameter (id) is missing", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};
