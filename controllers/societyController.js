const Society = require('../models/Society');
const { sendResponse } = require('../services/responseHandler');
module.exports.insertSociety = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({ message: "Request body is empty", status: 0 });
        }
        const { name, address, city, state, country, zipcode, numWings, numFloors, flatsPerFloor } = req.body;
        let chekcexsitingName = await Society.findOne({name : name});
        if(chekcexsitingName) return sendResponse(res, 400, "Society name already exist", 0);
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
        const society = new Society({
            name,
            address,
            city,
            state,
            country,
            zipcode,
            wings
        });
        await society.save();
        if (society) {
            return res.status(200).json({ message: "Society added successfully", status: 1, data: society });
        } else {
            return res.status(400).json({ message: "Failed to add society", status: 0 });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.getSociety = async (req, res) => {
    try {
        if (req.params.id === '' || req.params.id === undefined || req.params.id === null) {
            const society = await Society.find();
            if (society) {
                return res.status(200).json({ message: "Society fetched successfully", status: 1, data: society });
            } else {
                return res.status(400).json({ message: "Society not found", status: 0 });
            }
        } else {
            const society = await Society.findById(req.params.id);
            if (society) {
                return res.status(200).json({ message: "Society fetched successfully", status: 1, data: society });
            } else {
                return res.status(400).json({ message: "Society not found", status: 0 });
            }
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}
