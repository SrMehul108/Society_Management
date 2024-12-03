const Complaint = require('../models/Complaint');
const { sendResponse } = require('../services/responseHandler');

module.exports.insertComplaint = async (req, res) => {
    try {
        if (req.body) {
            if (req.user.societyId) {
                req.body.societyId = req.user.societyId;
                const newData = new Complaint(req.body);
                await newData.save();
                if (newData) {
                    return res.status(200).json({ message: "Complaint Raised successfully", status: 1, data: newData });
                }
                return sendResponse(res,400,"There was an error while saving data",0)
            }
            return sendResponse(res,400,"Unauthorized",0)
        } else {
            return sendResponse(res,400,"Something went wrong",0)
        }
    } catch (error) {
        console.log(error);
        return sendResponse(res,500,"Internal Server Error",0)
    }
}

module.exports.viewComplaint = async (req, res) => {
    try {
        const { id } = req.query;
        const { type } = req.query;
        if (!type) {
            return sendResponse(res,400,"Type is required",0)
        }
        if (id) {
            const data = await Complaint.findOne({ _id: id, societyId: req.user.societyId, isActive: true, type: type });
            if (data) {
                return res.status(200).json({ message: "Data fetched successfully", status: 1, data: data });
            }
            return sendResponse(res,400,"No data found with the given id",0)
        }
        const allData = await Complaint.find({ societyId: req.user.societyId, isActive: true, type: type });
        if (allData) return res.status(200).json({ message: "Data fetched successfully", status: 1, data: allData });
        return sendResponse(res,400,"No data found",0)
    } catch (error) {
        console.log(error);
        return sendResponse(res,500,"Internal Server Error",0)
    }
}

module.exports.editComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.societyId = req.user.societyId;
            let updatedData = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return res.status(200).json({ message: "Data Update Successfully", status: 1, data: updatedData });
            }
            return sendResponse(res,400,"Data not updated",0)
        }
        return sendResponse(res,400,"Parameter (id) is missing",0)
    } catch (error) {
        console.log(error);
        return sendResponse(res,500,"Internal Server Error",0)
    }
}

module.exports.deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.isActive = false;
            let updatedData = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return res.status(200).json({ message: "Data Delete Successfully", status: 1, data: updatedData });
            }
            return sendResponse(res,400,"Data not deleted",0)
        }
        return sendResponse(res,400,"Parameter (id) is missing",0)
    } catch (error) {
        console.log(error);
        return sendResponse(res,500,"Internal Server Error",0)
    }
}