const mongoose = require('mongoose');
const User = require('../models/User');
const Member = require('../models/Member');
const Vehicle = require('../models/Vehicle');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const cloudinaryConfig = require('../config/cloudinaryConfig');
module.exports.insertUser = async (req, res) => {
    try {
        if (req.body !== '') {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exist', status: 0 });
            }
            var password = req.body.fullName?.replace(/\s+/g, '') + "#@" + req.body.age;
            let pass = await bcrypt.hash(password, 10);
            const data = {
                fullName: req.body.fullName,
                phoneNo: req.body.phoneNo,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                wing: req.body.wing,
                unit: req.body.unit,
                societyId: req.user.societyId,
                type: req.body.type,
                password: pass
            };
            if (req.body.type === 'tenant') {
                data.owner = {
                    fullname: req.body.owner.fullname,
                    phoneNo: req.body.owner.phoneNo,
                    address: req.body.owner.address
                }
            }
            if (req.body.members && req.body.members.length > 0) {
                var members = JSON.parse(req.body.members);
            }
            if (req.body.vehicles && req.body.vehicles.length > 0) {
                var vehicles = JSON.parse(req.body.vehicles);
            }
            if (req.files) {
                if (req.files?.aadharImage_front?.[0]?.path) {
                    data.aadharImage_front = req.files.aadharImage_front[0].path;
                }
                if (req.files?.aadharImage_back?.[0]?.path) {
                    data.aadharImage_back = req.files.aadharImage_back[0].path;
                }
                if (req.files?.addressProofImage?.[0].path) {
                    data.addressProofImage = req.files.addressProofImage[0].path;
                }
                if (req.files?.rentalAgreementImage?.[0].path) {
                    data.rentalAgreementImage = req.files.rentalAgreementImage[0].path;
                }
            }
            const newUser = new User(data);
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
                const info = await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: req.body.email,
                    subject: "Registration Successful ✔",
                    text: `Hello ${req.body.fullname}`,
                    html: `<p>You've Successfully Registered</p><br><p>You can now log in with 
                        Email : ${req.body.email},
                        password : ${password}
                    </p>`,
                })
                if (members && members.length > 0 || vehicles && vehicles.length > 0) {
                    if (members && members.length > 0) {
                        members.forEach(member => {
                            member.UserId = newUser._id;
                        });
                        const insertedMembers = await Member.insertMany(members);
                        if (insertedMembers && insertedMembers.length > 0) {
                            const memberIds = insertedMembers.map(member => member._id);
                            if (memberIds && memberIds.length > 0) {
                                var user = await User.findById(newUser._id);
                                if (user) {
                                    user.members = memberIds;
                                    await user.save();
                                }
                            }
                        }
                    }
                    if (vehicles && vehicles.length > 0) {
                        vehicles.forEach(vehicle => {
                            vehicle.UserId = newUser._id;
                        });
                        const insertedVehicles = await Vehicle.insertMany(vehicles);
                        if (insertedVehicles && insertedVehicles.length > 0) {
                            const vehicleIds = insertedVehicles.map(v => v._id);
                            if (vehicleIds && vehicleIds.length > 0) {
                                var user = await User.findById(newUser._id);
                                if (user) {
                                    user.vehicles = vehicleIds;
                                    await user.save();
                                }
                            }
                        }
                    }
                    return res.status(200).json({ message: "User Registered Successfully", status: 1, data: user });
                }
                return res.status(200).json({ message: "User Registered Successfully", status: 1, data: newUser });
            } else {
                console.log(error.message);
                return res.status(400).json({ message: "Something Wrong", status: 0 });
            }
        } else {
            return res.status(500).json({ message: "Something went wrong", status: 0 });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", status: 0 });
    }
};

module.exports.viewUser = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const userdata = await User.findById({ id: id, societyId: req.user.societyId }).populate(['members', 'vehicles']).exec();
            if (userdata) {
                return res.status(200).json({ message: "User fetched Succesfully", status: 1, data: userdata });
            } else {
                return res.status(400).json({ message: "User not found", status: 0, data: [] });
            }
        }

        const userData = await User.find({ societyId: req.user.societyId });
        if (userData && userData.length > 0) {
            const formattedData = userData.map(user => ({
                ...user.toObject(),
                members: user.members.length,
                vehicles: user.vehicles.length
            }));
            return res.status(200).json({ message: "User data fetched succesfully", status: 1, data: formattedData });
        } else {
            return res.status(400).json({ message: "User not found", status: 1, data: [] });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server error", status: 0 })
    }
}

module.exports.editUser = async (req, res) => {
    try {
        const { Id } = req.params;
        if (Id) {
            if (req.body) {
                const existingData = await User.findOne({ _id: Id, societyId: req.user.societyId });
                if (existingData) {
                    const data = {
                        fullName: req.body.fullName,
                        phoneNo: req.body.phoneNo,
                        email: req.body.email,
                        age: req.body.age,
                        gender: req.body.gender,
                        wing: req.body.wing,
                        unit: req.body.unit,
                        societyId: req.user.societyId,
                        type: req.body.type,
                    };

                    if (req.body.type === 'tenant' && req.body.owner) {
                        data.owner = {
                            fullname: req.body.owner.fullname,
                            phoneNo: req.body.owner.phoneNo,
                            address: req.body.owner.address
                        };
                    } else {
                        data.owner = existingData.owner;
                    }
                    if (req.body.members && req.body.members.length > 0) {
                        const members = JSON.parse(req.body.members);
                        const updatedMemberIds = [];

                        for (let member of members) {
                            if (member._id) {
                                await Member.findByIdAndUpdate(member._id, member);
                                updatedMemberIds.push(member._id);
                            } else {
                                const newMember = new Member({ ...member, UserId: Id });
                                const savedMember = await newMember.save();
                                updatedMemberIds.push(savedMember._id);
                            }
                        }
                        data.members = updatedMemberIds;
                    }
                    if (req.body.vehicles && req.body.vehicles.length > 0) {
                        const vehicles = JSON.parse(req.body.vehicles);
                        const updatedVehicleIds = [];
                        for (let vehicle of vehicles) {
                            if (vehicle._id) {
                                await Vehicle.findByIdAndUpdate(vehicle._id, vehicle);
                                updatedVehicleIds.push(vehicle._id);
                            } else {
                                const newVehicle = new Vehicle({ ...vehicle, UserId: Id });
                                const savedVehicle = await newVehicle.save();
                                updatedVehicleIds.push(savedVehicle._id);
                            }
                        }
                        data.vehicles = updatedVehicleIds;
                    }
                    if (req.files) {
                        if (req.files?.aadharImage_front?.[0]?.path) {
                            if (existingData.aadharImage_front) {
                                const publicId = existingData.aadharImage_front.split('/').pop().split('.')[0];
                                await cloudinary.uploader.destroy(`aadharImages/${publicId}`);
                            }
                            data.aadharImage_front = req.files.aadharImage_front[0].path;
                        }
                        if (req.files?.aadharImage_back?.[0]?.path) {
                            if (existingData.aadharImage_back) {
                                const publicId = existingData.aadharImage_back.split('/').pop().split('.')[0];
                                await cloudinary.uploader.destroy(`aadharImages/${publicId}`);
                            }
                            data.aadharImage_back = req.files.aadharImage_back[0].path;
                        }
                        if (req.files?.addressProofImage?.[0]?.path) {
                            if (existingData.addressProofImage) {
                                const publicId = existingData.addressProofImage.split('/').pop().split('.')[0];
                                await cloudinary.uploader.destroy(`addressProofImages/${publicId}`);
                            }
                            data.addressProofImage = req.files.addressProofImage[0].path;
                        }
                        if (req.files?.rentalAgreementImage?.[0]?.path) {
                            if (existingData.rentalAgreementImage) {
                                const publicId = existingData.rentalAgreementImage.split('/').pop().split('.')[0];
                                await cloudinary.uploader.destroy(`rentalAgreementImages/${publicId}`);
                            }
                            data.rentalAgreementImage = req.files.rentalAgreementImage[0].path;
                        }
                    }
                    const updatedUser = await User.findByIdAndUpdate(Id, data, { new: true });
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
            return res.status(400).json({ message: "Parameter Id is Missing", status: 0 });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error", status: 0 });
    }
};


module.exports.deleteUser = async (req, res) => {
    try {
        var { Id } = req.params;
        if (Id) {
            const userData = await User.findOne({ id: Id, societyId: req.user.societyId });
            if (userData) {
                userData.isActive = false;
                const updateData = await User.findByIdAndUpdate(Id, userData, { new: true });
                if (updateData) {
                    return res.status(200).json({ message: "user Vacate Successfully", status: 1 });
                }
                return res.status(400).json({ message: "data Not Updated Successfully", status: 0 });
            }
            return res.status(404).json({ message: "User data Not Found", status: 0 });
        }
        return res.status(400).json({ message: "UserId is Missing", status: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", status: 0 });
    }
}