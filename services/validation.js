module.exports.validateRequest = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "Request body is empty", status: 0 });
    }
    if (!req.user || !req.user.societyId) {
        res.status(400).json({ message: "Invalid user session", status: 0 });
    }
};