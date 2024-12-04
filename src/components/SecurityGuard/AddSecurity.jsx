

import React, { useState, useEffect } from "react";

const AddSecurity = ({ isOpen, onClose, itemToEdit }) => {
    if (!isOpen) return null;

    // State for form fields
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        date: "",
        amount: "",
    });

    // State to track if Save button should be enabled
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);

    // Set form values if editing an existing item
    useEffect(() => {
        if (itemToEdit) {
            setFormValues({
                title: itemToEdit.title,
                description: itemToEdit.description,

                amount: itemToEdit.amount,
            });
        } else {
            setFormValues({
                title: "",
                description: "",

                amount: "",
            });
        }
    }, [itemToEdit]);

    // Handle input changes and enable Save button
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setIsSaveEnabled(true); // Enable Save button when there's a change
    };

    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative z-60"> {/* Ensure this has a higher z-index */}
                <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2 border-opacity-10">
                    {itemToEdit ? "Edit Security" : "Add Security"}
                </h2>
                <form className="space-y-4">
                    <div className="flex items-center ">
                        <div className="w-20 h-20 border rounded-full mr-5">

                            <div >
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className=" items-center justify-center ">
                            <input type="file" className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="text-blue-500 cursor-pointer hover:underline">
                                Add  photo
                            </label>

                        </div>
                    </div>
                    <div>
                        <label className="block font-medium">
                            Full Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formValues.title}
                            onChange={handleInputChange}
                            placeholder="Enter Full Name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">
                            Phone Number<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formValues.description}
                            onChange={handleInputChange}
                            placeholder="+9125689632"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block font-medium">
                                Gender<span className="text-red-500">*</span>
                            </label>
                           <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="male">Male</option>
                            <option value="Female">FeMale</option>
                           </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium">
                                Shift<span className="text-red-500">*</span>
                            </label>
                           <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Day">Day</option>
                            <option value="Night">Night</option>
                           </select>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block font-medium">
                                Date<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formValues.date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium">
                                Amount<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="amount"
                                value={formValues.amount}
                                onChange={handleInputChange}
                                placeholder="₹ 0000"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium">Upload Bill</label>
                        <div className="text-center items-center justify-center border-dashed border-2 border-gray-300 rounded-lg p-10">
                            <input type="file" className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="text-blue-500 cursor-pointer hover:underline">
                                Upload a file or drag and drop
                            </label>
                            <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div className="w-1/2 justify-center flex">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 w-full"
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="w-1/2 justify-center flex">
                            <button
                                type="submit"
                                disabled={!isSaveEnabled}
                                className={`px-4 py-2 rounded-md w-full transition duration-300 ${isSaveEnabled
                                    ? " text-white bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500"
                                    : "bg-gray-300 text-white cursor-not-allowed"
                                    }`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSecurity;
