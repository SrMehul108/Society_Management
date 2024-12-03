const Visitor = require('../models/Visitor');
const {sendResponse}=require("../services/responseHandler")

module.exports.createNewEntry = async (req, res) => {
    try {

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