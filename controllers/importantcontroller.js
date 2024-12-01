const Important = require('../models/Important');

module.exports.insert = async (req, res) => {
    try {
        if (req.body && req.body !== '') {
            let check = await Important.findOne({ phoneNo: req.body.phoneNo });
            if (check) {
                return res.status(400).json({ message: "Number already exist", status: 0 });
            }
            req.body.societyId = req.user.societyId;
            let newData = new Important(req.body);
            await newData.save();
            if (newData) {
                return res.status(200).json({ message: "Data Inserted Successfull", status: 0, data: newData });
            }
            return res.status(400).json({ message: "Something Wrong", status: 0 });
        }
        return res.status(400).json({ message: "Something went wrong", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error', status: 0 });
    }
}

module.exports.viewImportnat = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            let data = await Important.findOne({ _id: id });
            if (data) {
                return res.status(200).json({ message: 'Data fetched Succesfully', status: 1, data: data })
            }
            return res.status(400).json({ message: "No data Found", status: 0 });
        }
        const data = await Important.find({ isActive: true, societyId: req.user.societyId });
        if (data) {
            return res.status(200).json({ message: "Data fetched successfully", status: 1, data: data });
        }
        return res.status(400).json({ message: "No data Found", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.editImportant = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            let existingData = await Important.findOne({ _id: id });
            if (existingData) {
                let check = await Important.findOne({ phoneNo: req.body.phoneNo });
                if (check) {
                    return res.status(400).json({ message: "Number already exist", status: 0 });
                }
                const updatedData = await Important.findByIdAndUpdate(id, req.body, { new: true });
                if (updatedData) {
                    return res.status(200).json({ message: "Data update successfully", status: 1, data: updatedData });
                }
                return res.status(400).json({ message: "Something Went wrong" });
            }
            return res.status(400).json({ message: "No data Found", status: 0 });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.deleteImportant = async (req, res) => {
    try {
        console.log('hiii');
        
        const { id } = req.params;
        if (id) {
            let data = await Important.findOne({ _id: id });
            if (data) {
                data.isActive = false;
                const updatedData = await Important.findByIdAndUpdate(id, data, { new: true });
                if (updatedData) {
                    return res.status(200).json({ message: "Data update successfully", status: 1, data: updatedData });
                }
                return res.status(400).json({ message: "Something Went wrong" });
            }
            return res.status(400).json({ message: "No data Found", status: 0 });
        }
        return res.status(400).json({ message: "Parameter (Id) is missing", status: 0 })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server error', status: 0 });
    }
}