const UserModel = require('../models/UserData');
const mongoose = require('mongoose');
const Member = require('../models/Member');
const Vehicle = require('../models/Vehicle');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cloudinaryConfig = require('../config/cloudinaryConfig');
const { regestration } = require('../services/emailtemplate');

module.exports.insertUser = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty", status: 0 });
        }
        // Check for existing user
        const existingUser = await UserModel.findOne({ email: req.body.email});
        if (existingUser) {
            const wingValidation = await UserModel.findOne({
                societyId: req.user.societyId,
                role: 'user',
                wing: req.body.wing,
                unit: req.body.unit,
                _id: { $ne: existingUser._id }
            });
            if (wingValidation) {
                return res.status(400).json({ message: "On selected Wing & unit, there is already a resident", status: 0 });
            }
            return res.status(400).json({ message: 'Email already exists', status: 0 });
        }
        // Generate secure password
        const password = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 10);
        // Prepare user data
        const data = {
            fullName: req.body.fullName,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            age: req.body.age,
            gender: req.body.gender,
            societyId: req.user.societyId,
            password: hashedPassword,
            role: 'user',
            metaData: {
                wing: req.body.wing || null,
                unit: req.body.unit || null,
                type: req.body.type || null
            },
        };
        // Parse JSON inputs
        let members, vehicles, owner;
        try {
            if (req.body.members) members = JSON.parse(req.body.members);
            if (req.body.vehicles) vehicles = JSON.parse(req.body.vehicles);
            if (req.body.owner && data.metaData.type === 'tenant') owner = JSON.parse(req.body.owner);
        } catch (err) {
            return res.status(400).json({ message: "Invalid JSON format", status: 0 });
        }
        if (owner) data.metaData.owner = owner;
        // File uploads
        if (req.files) {
            data.profile_image = req.files?.profile_image?.[0]?.path || null;
            data.metaData.aadharImage_front = req.files?.aadharImage_front?.[0]?.path || null;
            data.metaData.aadharImage_back = req.files?.aadharImage_back?.[0]?.path || null;
            data.metaData.addressProofImage = req.files?.addressProofImage?.[0]?.path || null;
            data.metaData.rentalAgreementImage = req.files?.rentalAgreementImage?.[0]?.path || null;
        }
        // Create user and related entities
        const session = await mongoose.startSession();
        session.startTransaction();

        const newUser = await UserModel.create([data], { session });

        if (members) {
            const insertedMembers = await Member.insertMany(
                members.map(m => ({ ...m, userId: newUser[0]._id })),
                { session }
            );
            newUser[0].metaData.members = insertedMembers.map(m => m._id);
        }

        if (vehicles) {
            const insertedVehicles = await Vehicle.insertMany(
                vehicles.map(v => ({ ...v, userId: newUser[0]._id })),
                { session }
            );
            newUser[0].metaData.vehicles = insertedVehicles.map(v => v._id);
        }

        await newUser[0].save({ session });
        await session.commitTransaction();
        session.endSession();
        // Send registration email
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: { user: process.env.EMAIL, pass: process.env.PASSWORD }
            });
            const htmlMessage = regestration(req.body.fullName, req.body.email, password);
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: req.body.email,
                subject: "Registration Successful ✔",
                text: `Hello ${req.body.fullName}, You've successfully registered.`,
                html: htmlMessage
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
        }
        return res.status(200).json({ message: "User Registered Successfully", status: 1, data: newUser[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
};


module.exports.viewUser = async (req, res) => {
    try {
        const { id } = req.query;

        if (id) {
            // Fetching user by ID
            const userdata = await UserModel.findOne({ _id: id, societyId: req.user.societyId, role: "user" }).populate(['metaData.members', 'metaData.vehicles']).exec();

            if (userdata) {
                const formattedData = {
                    ...userdata.toObject(),
                    metaData: {
                        ...userdata.metaData,
                        members: userdata.metaData.members?.map((member) => ({ id: member._id, name: member.name, age: member.age })),
                        vehicles: userdata.metaData.vehicles?.map((vehicle) => ({ id: vehicle._id, model: vehicle.model, registrationNo: vehicle.registrationNo })),
                    },
                };
                return res.status(200).json({ message: "User fetched successfully", status: 1, data: formattedData, });
            } else {
                return res.status(400).json({ message: "User not found", status: 0, data: [], });
            }
        }

        // Fetch all users
        const userData = await UserModel.find({ societyId: req.user.societyId, isActive: true, role: 'user' });

        if (userData && userData.length > 0) {
            const formattedData = userData.map(user => ({
                ...user.toObject(),
                members: user.metaData.members?.length || 0,
                vehicles: user.metaData.vehicles?.length || 0,
            }));
            return res.status(200).json({ message: "User data fetched successfully", status: 1, data: formattedData, });
        } else {
            return res.status(400).json({ message: "No users found", status: 0, data: [], });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
};

module.exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            if (req.body) {
                const existingData = await User.findOne({ _id: id, societyId: req.user.societyId, role: 'user' });
                if (existingData) {
                    if (req.body.wing && req.body.unit &&
                        (req.body.wing !== existingData.wing || req.body.unit !== existingData.unit)) {
                        const wingValidation = await User.findOne({
                            societyId: req.user.societyId,
                            role: 'user',
                            wing: req.body.wing,
                            unit: req.body.unit
                        });
                        if (wingValidation && existingData._id !== wingValidation._id) {
                            return res.status(400).json({ message: "On selected Wing & unit, there is already a resident" });
                        }
                    }
                    const data = {
                        fullName: req.body.fullName,
                        phoneNo: req.body.phoneNo,
                        email: req.body.email,
                        age: req.body.age,
                        gender: req.body.gender,
                        societyId: req.user.societyId,
                        password: hashedPassword,
                        role: 'user',
                        metaData: {
                            wing: req.body.wing || existingData.metaData.wing,
                            unit: req.body.unit || existingData.metaData.unit,
                            type: req.body.type || existingData.metaData.type
                        },
                    };
                    let owner;
                    if (req.body.owner && data.metaData.type === 'tenant') {
                        try {
                            owner = JSON.parse(req.body.owner);
                        } catch (err) {
                            return res.status(400).json({ message: "Invalid owner data", status: 0 });
                        }
                    }
                    if (owner) data.metaData.owner = owner;

                    if (req.body.members && req.body.members.length > 0) {
                        const members = JSON.parse(req.body.members);
                        const updatedMemberIds = [];
                        for (let member of members) {
                            if (member._id) {
                                await Member.findByIdAndUpdate(member._id, member);
                                updatedMemberIds.push(member._id);
                            } else {
                                const existingMember = await Member.findOne({ email: member.email });
                                if (existingMember) {
                                    return res.status(400).json({ message: `Member with email ${member.email} already exists`, status: 0 });
                                }
                                const newMember = new Member({ ...member, UserId: id });
                                const savedMember = await newMember.save();
                                updatedMemberIds.push(savedMember._id);
                            }
                        }
                        data.metaData.members = updatedMemberIds;
                    }
                    if (req.body.vehicles && req.body.vehicles.length > 0) {
                        const vehicles = JSON.parse(req.body.vehicles);
                        const updatedVehicleIds = [];
                        for (let vehicle of vehicles) {
                            if (vehicle._id) {
                                await Vehicle.findByIdAndUpdate(vehicle._id, vehicle);
                                updatedVehicleIds.push(vehicle._id);
                            } else {
                                const existingVehicle = await Vehicle.findOne({ vehicleNumber: vehicle.vehicleNumber });
                                if (existingVehicle) {
                                    return res.status(400).json({ message: `Vehicle with number ${vehicle.vehicleNumber} already exists`, status: 0 });
                                }
                                const newVehicle = new Vehicle({ ...vehicle, UserId: id });
                                const savedVehicle = await newVehicle.save();
                                updatedVehicleIds.push(savedVehicle._id);
                            }
                        }
                        data.metaData.vehicles = updatedVehicleIds;
                    }
                    if (req.files) {
                        if (req.files?.profile_image?.[0]?.path) {
                            if (existingData.metaData.profile_image) {
                                const publicId = existingData.profile_image.split('/').pop().split('.')[0];
                                await cloudinaryConfig.uploader.destroy(`profileImages/${publicId}`);
                            }
                            data.profile_image = req.files.profile_image[0].path;
                        }
                        if (req.files?.aadharImage_front?.[0]?.path) {
                            if (existingData.metaData.aadharImage_front) {
                                const publicId = existingData.aadharImage_front.split('/').pop().split('.')[0];
                                await cloudinaryConfig.uploader.destroy(`aadharImages/${publicId}`);
                            }
                            data.metaData.aadharImage_front = req.files.aadharImage_front[0].path;
                        }
                        if (req.files?.aadharImage_back?.[0]?.path) {
                            if (existingData.metaData.aadharImage_back) {
                                const publicId = existingData.aadharImage_back.split('/').pop().split('.')[0];
                                await cloudinaryConfig.uploader.destroy(`aadharImages/${publicId}`);
                            }
                            data.metaData.aadharImage_back = req.files.aadharImage_back[0].path;
                        }
                        if (req.files?.addressProofImage?.[0]?.path) {
                            if (existingData.metaData.addressProofImage) {
                                const publicId = existingData.addressProofImage.split('/').pop().split('.')[0];
                                await cloudinaryConfig.uploader.destroy(`addressProofImages/${publicId}`);
                            }
                            data.metaData.addressProofImage = req.files.addressProofImage[0].path;
                        }
                        if (req.files?.rentalAgreementImage?.[0]?.path) {
                            if (existingData.metaData.rentalAgreementImage) {
                                const publicId = existingData.rentalAgreementImage.split('/').pop().split('.')[0];
                                await cloudinaryConfig.uploader.destroy(`rentalAgreementImages/${publicId}`);
                            }
                            data.metaData.rentalAgreementImage = req.files.rentalAgreementImage[0].path;
                        }
                    }
                    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
                    if (updatedUser) {
                        return res.status(200).json({ message: "User updated successfully", status: 1, data: updatedUser });
                    } else {
                        return res.status(400).json({ message: "User data Not updated", status: 0 });
                    }
                } else {
                    return res.status(404).json({ message: "User data Not Found", status: 0 });
                }
            } else {
                return res.status(400).json({ message: "Data is Missing", status: 0 });
            }
        } else {
            return res.status(400).json({ message: "Parameter id is Missing", status: 0 });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error", status: 0 });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        var { id } = req.params;
        if (id) {
            const userData = await User.findOne({ _id: id, societyId: req.user.societyId, role: 'user' });
            if (userData) {
                userData.isActive = false;
                const updateData = await User.findByIdAndUpdate(id, userData, { new: true });
                if (updateData) {
                    return res.status(200).json({ message: "User Vacate Successfully", status: 1 });
                }
                return res.status(400).json({ message: "data Not Updated", status: 0 });
            }
            return res.status(404).json({ message: "User data Not Found", status: 0 });
        }
        return res.status(400).json({ message: "Parameter(id) is Missing", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.addNewSecurity = async (req, res) => {
    try {
        if (req.body !== "") {
            const existingUser = await UserModel.findOne({ email: req.body.email});
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists', status: 0 });
            }
            var password = req.body.fullName?.replace(/\s+/g, '') + "#@" + req.body.age;
            let pass = await bcrypt.hash(password, 10);
            const data = {
                fullName: req.body.fullName,
                phoneNo: req.body.phoneNo,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                securityData: {
                    shift: req.body.shift,
                    shiftDate: req.body.shiftDate,
                    shiftTime: req.body.shiftTime,
                },
                societyId: req.user.societyId,
                role: req.body.role ? req.body.role : 'security',
                password: pass,
                metaData: {}
            };

            if (req.files) {
                if (req.files?.profile_image?.[0]?.path) {
                    data.profile_image = req.files.profile_image[0].path;
                }
                if (req.files?.aadharImage_front?.[0]?.path) {
                    data.metaData.aadharImage_front = req.files.aadharImage_front[0].path;
                }
            }
            const newUser = new UserModel(data);
            await newUser.save();
            if (newUser) {
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD,
                    },
                });
                const htmlMessage = regestration(req.body.fullname, req.body.email, password);
                const info = await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: req.body.email,
                    subject: "Registration Successful ✔",
                    text: `Hello ${req.body.fullname}, You've Successfully Registered. You can now log in with Email: ${req.body.email}, Password: ${password}.`,
                    html: htmlMessage,
                });
                return res.status(200).json({ message: "Security Guard Registered Successfully", status: 1, data: newUser });
            }
            return res.status(400).json({ message: "Something went wrong", status: 0 });
        }
        return res.status(400).json({ message: "No data Found", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
};

module.exports.viewSecurity = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const userdata = await UserModel.findOne({ _id: id, societyId: req.user.societyId, role: "security" });
            if (userdata) {
                return res.status(200).json({ message: "Security Guard fetched Succesfully", status: 1, data: userdata });
            } else {
                return res.status(400).json({ message: "User not found", status: 0, data: [] });
            }
        }
        const userData = await UserModel.find({ societyId: req.user.societyId, isActive: true, role: 'security' });
        if (userData && userData.length > 0) {
            return res.status(200).json({ message: "Gaurd data fetched succesfully", status: 1, data: formattedData });
        } else {
            return res.status(400).json({ message: "Gaurd not found", status: 1, data: [] });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.editSecurity = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            if (req.body) {
                const existingData = await User.findOne({ _id: id, societyId: req.user.societyId, role: 'security' });
                if (existingData) {
                    const data = {
                        fullName: req.body.fullName,
                        phoneNo: req.body.phoneNo,
                        email: req.body.email,
                        age: req.body.age,
                        gender: req.body.gender,
                        shift: req.body.shift,
                        shiftDate: req.body.shiftDate,
                        shiftTime: req.body.shiftTime,
                    };
                    if (req.files) {
                        if (req.files?.profile_image?.[0]?.path) {
                            if (existingData.profile_image) {
                                const publicId = existingData.profile_image.split('/').pop().split('.')[0];
                                await cloudinaryConfig.uploader.destroy(`profileImages/${publicId}`);
                            }
                            data.profile_image = req.files.profile_image[0].path;
                        }
                        if (req.files?.aadharImage_front?.[0]?.path) {
                            if (existingData.aadharImage_front) {
                                const publicId = existingData.aadharImage_front.split('/').pop().split('.')[0];
                                await cloudinaryConfig.uploader.destroy(`aadharImages/${publicId}`);
                            }
                            data.aadharImage_front = req.files.aadharImage_front[0].path;
                        }
                    }
                    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
                    if (updatedUser) {
                        return res.status(200).json({ message: "Data updated successfully", status: 1, data: updatedUser });
                    }
                    return res.status(400).json({ message: "Data Not updated", status: 0 });
                }
                return res.status(404).json({ message: "Data Not Found", status: 0 });
            }
            return res.status(400).json({ message: "Data is Missing", status: 0 });
        }
        return res.status(400).json({ message: "Parameter id is Missing", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}

module.exports.deleteSecurity = async (req, res) => {
    try {
        var { id } = req.params;
        if (id) {
            const userData = await User.findOne({ _id: id, societyId: req.user.societyId, role: 'security' });
            if (userData) {
                userData.isActive = false;
                const updateData = await User.findByIdAndUpdate(id, userData, { new: true });
                if (updateData) {
                    return res.status(200).json({ message: "gaurd Delete Succesfukky", status: 1 });
                }
                return res.status(400).json({ message: "data Not deleted", status: 0 });
            }
            return res.status(404).json({ message: "Gaurd data Not Found", status: 0 });
        }
        return res.status(400).json({ message: "Parameter(id) is Missing", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}