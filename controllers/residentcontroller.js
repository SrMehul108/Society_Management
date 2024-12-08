const User = require('../models/UserData');
const { sendResponse } = require('../services/responseHandler');

module.exports.userDetail = async (req, res) => {
    try {
        if (!req.user) {
            return sendResponse(res, 403, "Oops! i think your session is expired"); F
        }
        const userData = await User.find({ societyid: req.user.societyid, isActive: true, role: "user" }).select('_id', 'fullName', 'metaData.wing', 'metaData.unit');
        if (!userData) {
            return sendResponse(res, 400, "No data Found", 0);
        }
        return sendResponse(res, 200, "data Fetched Succesfully", 1, userData);
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}