const Note = require('../models/Note');
const {sendResponse} = require("../services/responseHandler")

module.exports.insertNote = async (req, res) => {
    try {
        if (req.body) {
            if (req.user.societyId) {
                req.body.societyId = req.user.societyId;
                const newData = new Note(req.body);
                await newData.save();
                if (newData) {
                    return res.status(200).json({ message: "Note added successfully", status: 1, data: newData });
                }
                return sendResponse(res,400,"There was an error while saving data" ,0)
            }
            return sendResponse(res,400,"Unauthorized" ,0)
        } else {
            return sendResponse(res,400,"Invalid request" ,0)
        }
    } catch (error) {
        console.log(error);
        return sendResponse(res,500,"Internal Server Error" ,0)
    }
}

module.exports.viewNote = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const data = await Note.findOne({ _id: id, societyId: req.user.societyId, isActive: true });
            if (data) {
                return res.status(200).json({ message: "Data fetched successfully", status: 1, data: data });
            }
            return sendResponse(res,400,"Data not found" ,0)
        }
        const allData = await Note.find({ societyId: req.user.societyId, isActive: true });
        if (allData) return res.status(200).json({ message: "Data fetched successfully", status: 1, data: allData });
        return sendResponse(res,400,"Data not found" ,0)
    } catch (error) {
        console.log(error);
        return sendResponse(res,500,"Internal Server Error" ,0)
    }
}


module.exports.editNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.societyId = req.user.societyId;
            let updatedData = await Note.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return res.status(200).json({ message: "Data Update Successfully", status: 1, data: updatedData });
            }
            return sendResponse(res,400,"Data not found" ,0)
        }
        return sendResponse(res,400,"Parameter (id) is missing" ,0)
    } catch (error) {
        console.log(error);
        return sendResponse(res,500,"Internal Server Error" ,0)
    }
}

module.exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.isActive = false;
            let updatedData = await Note.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return res.status(200).json({ message: "Data Delete Successfully", status: 1, data: updatedData });
            }
            return sendResponse(res,400,"Data not found" ,0)
        }
        return sendResponse(res,400,"Parameter (id) is missing" ,0)
    } catch (error) {
        console.log(error);
        return sendResponse(res,500,"Internal Server Error" ,0)
    }
}