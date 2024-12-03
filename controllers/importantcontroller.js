const Important = require("../models/Important");
const { sendResponse } = require("../services/responseHandler");

module.exports.insert = async (req, res) => {
  try {
    if (req.body && req.body !== "") {
      let check = await Important.findOne({ phoneNo: req.body.phoneNo });
      if (check) {
        return sendResponse(res, 400, "Phone number already exists", 0);
      }
      req.body.societyId = req.user.societyId;
      let newData = new Important(req.body);
      await newData.save();
      if (newData) {
        return res.status(200).json({
          message: "Data Inserted Successfull",
          status: 0,
          data: newData,
        });
      }
      return sendResponse(res, 400, "Something Wrong", 0);
    }
    return sendResponse(res, 400, "Something went wrong", 0);
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
        return res
          .status(200)
          .json({ message: "Data fetched Succesfully", status: 1, data: data });
      }
      return sendResponse(res, 400, "Data Not Found", 0);
    }
    const data = await Important.find({
      isActive: true,
      societyId: req.user.societyId,
    });
    if (data) {
      return res
        .status(200)
        .json({ message: "Data fetched successfully", status: 1, data: data });
    }
    return sendResponse(res, 400, "Data Not Found", 0);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.editImportant = async (req, res) => {
  try {
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
          return res.status(200).json({
            message: "Data update successfully",
            status: 1,
            data: updatedData,
          });
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
    console.log("hiii");

    const { id } = req.params;
    if (id) {
      let data = await Important.findOne({ _id: id });
      if (data) {
        data.isActive = false;
        const updatedData = await Important.findByIdAndUpdate(id, data, {
          new: true,
        });
        if (updatedData) {
          return res.status(200).json({
            message: "Data update successfully",
            status: 1,
            data: updatedData,
          });
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
