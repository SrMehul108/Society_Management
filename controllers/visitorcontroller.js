const Visitor = require('../models/Visitor');
const { sendResponse } = require('../services/responseHandler');

module.exports.vistorLog = async (req, res) => {
    try {
        if (!req.user) {
            return sendResponse(res, 403, "You don't Authorized", 0);
        }
        const allData = await Visitor.find({ societyId: req.user.societyId });
        if (allData) {
            return sendResponse(res, 200, "data Fetched Succesfully", 1, allData);
        }
        return sendResponse(res, 400, "No data Found", 0, []);
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}

module.exports.getEntry = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const data = await Visitor.find({ _id: id, societyId: req.user.societyId });
        } else {
            const data = await Visitor.find({ societyId: req.user.societyId });
        }
        if (data) {
            return sendResponse(res, 200, "Visitor data fetched Successfully", 1, data);
        }
        return sendResponse(res, 400, "No data Found", 0, []);
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}

module.exports.editEntry = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const data = await Visitor.find({ _id: id, societyId: req.user.id });
            if (data) {
                const updateddata = await Visitor.findByIdAndUpdate(id, req.body);
                if (updateddata) {
                    return sendResponse(res, 200, "Data update successfully", 1, updateddata);
                }
                return sendResponse(res, 400, "Data Not Updated", 0, []);
            }
            return sendResponse(res, 400, "No data Found", 0, []);
        }
        return sendResponse(res, 400, "Parameter (ID) is missing", 0, []);
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}

module.exports.deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const data = await Visitor.findById(id);
            if (data) {
                data.isActive = false;
                const deleted = await Visitor.findByIdAndUpdate(id, data);
                if (deleted) {
                    return sendResponse(res, 200, "Data deleted successfully", 1, deleted);
                }
                return sendResponse(res, 400, "Something went wrong", 0);
            }
            return sendResponse(res, 400, "No data found", 0);
        } 
        return sendResponse(res, 400, "Parameter (ID) is missing", 0, []);
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}