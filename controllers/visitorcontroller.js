const Visitor = require('../models/Visitor');
const { sendResponse } = require('../services/responseHandler');

module.exports.vistorLog = async (req, res) => {
    try {
        if (!req.user) {
            return sendResponse(res, 403, "You don't Authorized", 0);
        }
        const allData = await Visitor.find({societyId : req.user.societyId});
        if(allData){
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

    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}

module.exports.editEntry = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}

module.exports.deleteEntry = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}