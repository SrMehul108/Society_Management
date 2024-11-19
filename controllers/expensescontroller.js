const Expenses = require('../models/Expenses');
const cloudinaryConfig = require('../config/cloudinaryConfig');

module.exports.insertExpense = async (req, res) => {
    try {
        if (req.body && req.body !== '') {
            if (req.files) {
                if (req.files?.uploadBill?.[0]?.path) {
                    req.body.uploadBill = req.files.uploadBill[0].path;
                }
            }
            req.body.societyId = req.user.societyId;

            const newExpense = new Expenses(req.body);
            await newExpense.save();
            if (newExpense) {
                return res.status(200).json({ message: "data insert Successfully", status: 1, data: newExpense });
            }
            return res.status(400).json({ message: "Something went wrong", status: 0 });
        }
        return res.status(400).json({ message: "Something missing in body data", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.viewExpense = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            let data = await Expenses.findOne({ _id: id });
            if (data) {
                return res.status(200).json({ message: 'Data fetched Successfully', status: 1, data: data });
            }
            return res.status(400).json({ message: 'No data Found', status: 0 });
        }
        let alldata = await Expenses.find({ isActive: true, societyId: req.user.societyId });
        if (alldata) {
            return res.status(200).json({ message: 'Data fetched Successfully', status: 1, data: alldata });
        }
        return res.status(400).json({ message: 'No data Found', status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.editExpense = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            let existingData = await Expenses.findOne({ _id: id });
            if (existingData) {
                if (req.files) {
                    if (req.files?.uploadBill?.[0]?.path) {
                        if (existingData.uploadBill) {
                            const publicId = existingData.uploadBill.split('/').pop().split('.')[0];
                            await cloudinaryConfig.uploader.destroy(`expenseBill/${publicId}`);
                        }
                        req.body.uploadBill = req.files.uploadBill[0].path;
                    }
                }
                let updateData = await Expenses.findByIdAndUpdate(id, req.body, { new: true });
                if (updateData) {
                    return res.status(200).json({ message: "Data Updated Successfully", status: 1, data: updateData });
                }
                return res.status(400).json({ message: "Something went wrong", status: 0 });
            }
            return res.status(400).json({ message: "No data Found", status: 0 });
        }
        return res.status(400).json({ message: "Missing Parameter (id)", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.deleteExpense = async (req, res) => {
    try {
        const {id} = req.params;
        if(id){
            let existingData = await Expenses.findOne({ _id: id });
            if(existingData){
                existingData.isActive = false;
                let updateData = await Expenses.findByIdAndUpdate(id, existingData, { new: true });
                if (updateData) {
                    return res.status(200).json({ message: "Data Deleted Successfully", status: 1});
                }
                return res.status(400).json({ message: "Something went wrong", status: 0 });
            }
            return res.status(400).json({ message: "No data Found", status: 0 });
        }
        return res.status(400).json({ message: "Missing Parameter (id)", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}