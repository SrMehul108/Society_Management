const Announcement = require('../models/Announcement');
const { sendResponse } = require('../services/responseHandler');
const { validateRequest } = require('../services/validation');

module.exports.createAnnouncement = async (req, res) => {
    try {
        validateRequest(req, res);
        if (req.user.societyId) {
            req.body.societyId = req.user.societyId;
            const newData = new Announcement(req.body);
            await newData.save();
            if (newData) {
                return sendResponse(res, 200, "Announcement created successfully", 1, newData);
            }
            return sendResponse(res, 400, "There was an error while saving data", 0)
        }
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.viewAnnouncement = async (req, res) => {
    try {
        const { id } = req.query;
        const { type } = req.query;
        if (id) {
            const data = await Announcement.findOne({ _id: id, societyId: req.user.societyId, isActive: true, type: type });
            if (data) {
                return sendResponse(res, 200, "Data fetched successfully", 1, data);
            }
            return sendResponse(res, 400, "No data found with the given id", 0)
        }
        const allData = await Announcement.find({ societyId: req.user.societyId, isActive: true, type: type });
        if (allData) return sendResponse(res, 200, "Data fetched successfully", 1, allData);
        return sendResponse(res, 400, "No data found", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.editAnnouncement = async (req, res) => {
    try {
        validateRequest(req, res);
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.societyId = req.user.societyId;
            let updatedData = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return sendResponse(res, 200, "Data updated successfully", 1, updatedData);
            }
            return sendResponse(res, 400, "Data not updated", 0)
        }
        return sendResponse(res, 400, "Parameter (id) is missing", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.isActive = false;
            let updatedData = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return sendResponse(res, 200, "Data deleted successfully", 1, updatedData);
            }
            return sendResponse(res, 400, "Data not deleted", 0)
        }
        return sendResponse(res, 400, "Parameter (id) is missing", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}