const Protocol = require('../models/Protocol');
const { sendResponse } = require('../services/responseHandler');
const { validateRequest } = require('../services/validation');
const notificationService = require('../services/notificationService');
const User = require('../models/UserData');
module.exports.insertProtocol = async (req, res) => {
    try {
        validateRequest(req, res);
        req.body.societyId = req.user.societyId;
        const newData = new Protocol(req.body);
        await newData.save();
        if (newData) {
            const usersInSociety = await User.find({ societyId: req.user.societyId, role: 'user', isActive: true }).select('_id');
            const targetUserIds = usersInSociety.map(user => user._id);
            await notificationService.sendNotification({
                type: 'protocol',
                message: `New Protocol created: ${newData.title}`,
                societyId: req.user.societyId,
                targetUsers: targetUserIds,
            });
            return sendResponse(res, 200, "Protocol inserted successfully", 1, newData);
        }
        return sendResponse(res, 400, "There was an error while saving data", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.viewProtocol = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const data = await Protocol.findOne({ _id: id, societyId: req.user.societyId, isActive: true });
            if (data) {
                return sendResponse(res, 200, "Data fetched successfully", 1, data);
            }
            return sendResponse(res, 400, "No data found with the given id", 0)
        }
        const allData = await Protocol.find({ societyId: req.user.societyId, isActive: true });
        if (allData) return sendResponse(res, 200, "Data fetched successfully", 1, allData);
        return sendResponse(res, 400, "No data found", 0)
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0)
    }
}

module.exports.editProtocol = async (req, res) => {
    try {
        validateRequest(req, res);
        const { id } = req.params;
        if (id) {
            req.body.societyId = req.user.societyId;
            let updatedData = await Protocol.findByIdAndUpdate(id, req.body, { new: true });
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

module.exports.deleteProtocol = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.isActive = false;
            let updatedData = await Protocol.findByIdAndUpdate(id, req.body, { new: true });
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