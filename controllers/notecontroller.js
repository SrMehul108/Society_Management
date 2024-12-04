const Note = require('../models/Note');
const { sendResponse } = require("../services/responseHandler");
const { validateRequest } = require('../services/validation');

module.exports.insertNote = async (req, res) => {
    try {
        validateRequest(req, res);
        req.body.societyId = req.user.societyId;
        const newData = new Note(req.body);
        await newData.save();
        if (newData) {
            sendResponse(res, 200, "Note inserted successfully", 1, newData);
        }
        return sendResponse(res, 400, "There was an error while saving data", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.viewNote = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const data = await Note.findOne({ _id: id, societyId: req.user.societyId, isActive: true });
            if (data) {
                sendResponse(res, 200, "Note found successfully", 1, data);
            }
            return sendResponse(res, 400, "Data not found", 0)
        }
        const allData = await Note.find({ societyId: req.user.societyId, isActive: true });
        if (allData) return sendResponse(res, 200, "Notes found successfully", 1, allData);
        return sendResponse(res, 400, "Data not found", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}


module.exports.editNote = async (req, res) => {
    try {
        validateRequest(req, res);
        const { id } = req.params;
        if (id) {
            req.body.societyId = req.user.societyId;
            let updatedData = await Note.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                sendResponse(res, 200, "Note updated successfully", 1, updatedData);
            }
            return sendResponse(res, 400, "Data not found", 0)
        }
        return sendResponse(res, 400, "Parameter (id) is missing", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.isActive = false;
            let updatedData = await Note.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                sendResponse(res, 200, "Note deleted successfully", 1, updatedData);
            }
            return sendResponse(res, 400, "Data not found", 0)
        }
        return sendResponse(res, 400, "Parameter (id) is missing", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}