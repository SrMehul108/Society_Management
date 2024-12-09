const Society = require('../models/Society');
const { sendResponse } = require('../services/responseHandler');


module.exports.insertSociety = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({ message: "Request body is empty", status: 0 });
        }
        const { name, address, city, state, country, zipcode, numWings, numFloors, flatsPerFloor } = req.body;
        let chekcexsitingName = await Society.findOne({ name: name });
        if (chekcexsitingName) return sendResponse(res, 400, "Society name already exist", 0);
        const wings = [];
        for (let i = 0; i < numWings; i++) {
            const wing = String.fromCharCode(65 + i); // Convert 0 -> 'A', 1 -> 'B', etc.
            const flats = [];
            for (let floor = 1; floor <= numFloors; floor++) {
                for (let flat = 1; flat <= flatsPerFloor; flat++) {
                    const unit = `${floor}${(flat).toString().padStart(2, '0')}`;
                    flats.push({ unit });
                }
            }
            wings.push({ wing, flats });
        }
        const society = new Society({ name, address, city, state, country, zipcode, wings });
        await society.save();
        if (society) {
            return sendResponse(200, "Society created successfully", 1, society);
        } else {
            return sendResponse(res, 400, "Failed to add society", 0);
        }
    } catch (error) {
        console.log(error.message);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}

module.exports.getSociety = async (req, res) => {
    try {
        if (req.params.id === '' || req.params.id === undefined || req.params.id === null) {
            const society = await Society.find();
            if (society) {
                return sendResponse(res, 200, "Societies found", 1, society);
            } else {
                return sendResponse(res, 400, "No society found", 0);
            }
        } else {
            const society = await Society.findById(req.params.id);
            if (society) {
                return sendResponse(res, 200, "Society found", 1, society);
            } else {
                return sendResponse(res, 400, "No society found", 0);
            }
        }
    } catch (error) {
        console.log(error.message);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}
