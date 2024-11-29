const Complaint = require('../models/Complaint');

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
                return res.status(400).json({ message: 'There was an error while saving data', status: 0 });
            }
            return res.status(400).json({ message: "Unauthorized", data: 0 });
        } else {
            return res.status(400).json({ message: "Something went wrong", data: 0 });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.viewComplaint = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const data = await Complaint.findOne({ _id: id, societyId: req.user.societyId, isActive: true, type: req.params.type });
            if (data) {
                return res.status(200).json({ message: "Data fetched successfully", status: 1, data: data });
            }
            return res.status(400).json({ message: 'No data found with the given id', status: 0 });
        }
        const allData = await Complaint.find({ societyId: req.user.societyId, isActive: true, type: req.params.type });
        if (allData) return res.status(200).json({ message: "Data fetched successfully", status: 1, data: allData });
        return res.status(400).json({ message: 'No data found', status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.editComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.societyId = req.user.societyId;
            let updatedData = await Facility.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return res.status(200).json({ message: "Data Update Successfully", status: 1, data: updatedData });
            }
            return res.status(400).json({ message: "Data not updated", status: 0 });
        }
        return res.status(400).json({ message: "Parameter (id) is missing", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            req.body.isActive = false;
            let updatedData = await Note.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedData) {
                return res.status(200).json({ message: "Data Delete Successfully", status: 1, data: updatedData });
            }
            return res.status(400).json({ message: "Data not deleted", status: 0 });
        }
        return res.status(400).json({ message: "Parameter (id) is missing", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}