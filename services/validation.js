module.exports.validateRequest = (req, res) => {
    const {sendResponse}=require ("../services/responseHandler")
    if (!req.body || Object.keys(req.body).length === 0) {
        sendResponse(res, 400, "Invalid request body",0);
    }
    if (!req.user || !req.user.societyId) {
        sendResponse(res, 400, "Unauthorized",0);
    }
};