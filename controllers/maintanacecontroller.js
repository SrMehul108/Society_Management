const UserModel = require('../models/UserData');
const Payment = require('../models/Payment');
const Maintenance = require('../models/Maintenance');
const { sendResponse } = require('../services/responseHandler');

module.exports.insert = async (req, res) => {
    try {
        if (req.body && req.body !== '') {
            req.body.societyId = req.user.societyId;
            let existingMaintance = await Maintenance.findOne({ societyId: req.body.societyId, isActive: true });
            if (existingMaintance) {
                return res.status(400).json({ message: "Maintenance is already in place for this society" });
            }
            const newMaintenance = new Maintenance(req.body);
            await newMaintenance.save();
            if (newMaintenance) {
                const userIds = await UserModel.find({ societyId: req.user.societyId }).select('_id');
                const paymentPromises = userIds.map(userId => {
                    const paymentData = {
                        type: 'maintenance',
                        amount: newMaintenance.amount,
                        UserId: userId._id,
                    };
                    return new Payment(paymentData).save();
                });
                await Promise.all(paymentPromises);
                return sendResponse(res, 200, "Maintanace added Succesfully", 1, newMaintenance);
            }
            return sendResponse(res, 400, "Something went wrong", 0);
        }
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}

module.exports.viewMaintance = async (req, res) => {
    try {
        const societyId = req.user.societyId;
        if (societyId) {
            let maintance = await Maintenance.find({ societyId: societyId, isActive: true });
            if (maintance) {
                return res.status(200).json({ message: "Maintance Detailed fetched succesfully", status: 1, data: maintance });
            }
            return res.status(400).json({ message: "There is no Maintenance", status: 0 });
        }
        return sendResponse(res, 400, "Something went wrong", 0);
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}


module.exports.maintenanceDetail = async (req, res) => {
    try {
        const currentDate = new Date();

        if (req.user.societyId) {
            const isMaintenace = await Maintenance.find({ societyId: req.user.societyId });
            if (!isMaintenace) {
                return sendResponse(res, 400, "No Maintenance found", 0);
            }
            console.log(isMaintenace);
            
            // Retrieve user data for the society
            const userData = await UserModel.find({ societyId: req.user.societyId });
            if (userData && userData.length > 0) {
                const userIds = userData.map(user => user._id);

                // Retrieve payment data for these users where type is "maintenance"
                const paymentData = await Payment.find({
                    UserId: { $in: userIds },
                    type: "maintenance"
                });

                // Create a map of penalties based on user ID
                const penaltyMap = isMaintenace.reduce((acc, maintenance) => {
                    if (maintenance.dueDate && maintenance.dueDate < currentDate) {
                        // Calculate the extended due date
                        const extendedDueDate = new Date(maintenance.dueDate);
                        extendedDueDate.setDate(extendedDueDate.getDate() + maintenance.penaltyDay);

                        // If the extended due date has passed, set the penalty
                        if (extendedDueDate < currentDate) {
                            acc[maintenance.UserId] = maintenance.penaltyAmount;
                        }
                    }
                    return acc;
                }, {});

                // Combine user data with payments and add penalty if applicable
                const result = userData.map(user => {
                    const userPayment = paymentData.find(payment => payment.UserId.toString() === user._id.toString());

                    // Add penalty if it exists in the penaltyMap for the user
                    const paymentWithPenalty = userPayment ? {
                        ...userPayment.toObject(),
                        penalty: penaltyMap[user._id] || 0,  // Add penalty if it exists, otherwise 0
                        dueDate: isMaintenace[0]?.dueDate
                    } : {};

                    return { ...user.toObject(), payments: paymentWithPenalty };
                });
                return sendResponse(res, 200, "Maintenance Detail fetched successfully", 1, result);
            } else {
                return res.status(404).json({ message: "No users found", status: 0 });
            }
        } else {
            return res.status(400).json({ message: "Society ID not provided", status: 0 });
        }
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

module.exports.editMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        if (id && req.body !== "") {
            const existingData = await Maintenance.findById({ _id: id, societyId: req.user.societyId });
            if (!existingData && existingData == '') {
                return sendResponse(res, 400, "Maintenance data not found", 0);
            }
            const updateData = await Maintenance.findByIdAndUpdate(id, req.body, { new: true });
            if (updateData) {
                return sendResponse(res, 400, "Data Update Successfully", 1, updateData);
            }
            return sendResponse(res, 400, "There is an error while updating data", 0);
        }
        return sendResponse(res, 400, "Something went wrong", 0);
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}

module.exports.deleteMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const data = await Maintenance.findById(id);
            if (data) {
                data.isActive = false;
                const deleted = await Maintenance.findByIdAndUpdate(id, data);
                if (deleted) {
                    return res.status(200).json({ message: "Maintenance Delete Succesfully" });
                }
                return sendResponse(res, 400, "Something went wrong", 0);
            }
            return sendResponse(res, 400, "No data found", 0);
        }
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}