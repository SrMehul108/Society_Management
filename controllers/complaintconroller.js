const Complaint = require('../models/Complaint');
const { sendResponse } = require('../services/responseHandler');
const { validateRequest } = require('../services/validation');

module.exports.insertComplaint = async (req, res) => {
    try {
        validateRequest(req, res);
        if (req.user.societyId) {
            req.body.societyId = req.user.societyId;
            const newData = new Complaint(req.body);
            await newData.save();
            if (newData) {
                return sendResponse(res, 200, "Complaint inserted successfully", 1, newData);
            }
            return sendResponse(res, 400, "There was an error while saving data", 0)
        }
        return sendResponse(res, 400, "Unauthorized", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.viewComplaint = async (req, res) => {
    try {
        const { id } = req.query;
        const { type } = req.query;
        if (!type) {
            return sendResponse(res, 400, "Type is required", 0)
        }
        if (id) {
            const data = await Complaint.findOne({ _id: id, societyId: req.user.societyId, isActive: true, type: type });
            if (data) {
                return sendResponse(res, 200, "Complaint found successfully", 1, data);
            }
            return sendResponse(res, 400, "No data found with the given id", 0)
        }
        const allData = await Complaint.find({ societyId: req.user.societyId, isActive: true, type: type });
        if (allData) return sendResponse(res, 200, "Complaints found successfully", 1, allData);
        return sendResponse(res, 400, "No data found", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.editComplaint = async (req, res) => {
    try {
        validateRequest(req, res);
        const { id } = req.params;
        if (id) {
            req.body.societyId = req.user.societyId;
            let updatedData = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return sendResponse(res, 200, "Complaint updated successfully", 1, updatedData)
            }
            return sendResponse(res, 400, "Data not updated", 0)
        }
        return sendResponse(res, 400, "Parameter (id) is missing", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.isActive = false;
            let updatedData = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return sendResponse(res, 200, "Complaint deleted successfully", 1, updatedData);
            }
            return sendResponse(res, 400, "Data not deleted", 0)
        }
        return sendResponse(res, 400, "Parameter (id) is missing", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}