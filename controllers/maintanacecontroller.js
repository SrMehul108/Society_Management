const Maintanace = require('../models/Maintenance');
const User = require('../models/User');
module.exports.insert = async (req, res) => {
    try {
        if (req.body && req.body !== '') {
            req.body.societyId = req.user.societyId;
            const newMaintenance = new Maintanace(req.body);
            if (newMaintenance) {
                const userIds = await User.find({societyId : req.user.societyId}).select('_id');
                const paymentPromises = userIds.map(userId => {
                    const paymentData = {
                        type: 'maintenance',
                        amount: newMaintenance.amount,
                        userId: userId._id,
                    };
                    return new Payment(paymentData).save();
                });
                await Promise.all(paymentPromises);
                return res.status(200).json({ message: "maintanace added Succesfully", status: 0, data: newMaintenance });
            }
            return res.status(400).json({message: "Something went wrong", status: 0});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

