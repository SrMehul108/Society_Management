import React, { useState, useEffect } from "react";
import { addsecurity } from "../../apis/api";

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

    // State for loading and error handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Set form values if editing an existing item
    useEffect(() => {
        if (itemToEdit) {
            setFormValues({
                title: itemToEdit.title,
                description: itemToEdit.description,
                date: itemToEdit.date,
                amount: itemToEdit.amount,
            });
        } else {
            setFormValues({
                title: "",
                description: "",
                date: "",
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous error
        setIsLoading(true); // Start loading

        try {
            const security = {
                ...formValues,
            };

            if (itemToEdit) {
                // Update logic (if applicable)
                console.log("Update API Call:", security);
                // Call your update API here
            } else {
                // Add logic
                console.log("Add API Call:", security);
                const response = await addsecurity(security);
                console.log("API Response:", response);
            }

            // Reset the form and close the modal
            setFormValues({
                title: "",
                description: "",
                date: "",
                amount: "",
            });
            setIsSaveEnabled(false);
            onClose(); // Close the modal
        } catch (err) {
            console.error("API Error:", err);
            setError("Failed to save data. Please try again.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative z-60">
                <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2 border-opacity-10">
                    {itemToEdit ? "Edit Security" : "Add Security"}
                </h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Form fields */}
                    {/* Upload photo */}
                    <div className="flex items-center">
                        <div className="w-20 h-20 border rounded-full mr-5">
                            <div>
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className="items-center justify-center">
                            <input type="file" className="hidden" id="file-upload" />
                            <label
                                htmlFor="file-upload"
                                className="text-blue-500 cursor-pointer hover:underline"
                            >
                                Add photo
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
                    {/* Other fields */}
                    <div className="flex justify-between gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 w-full"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isSaveEnabled || isLoading}
                            className={`px-4 py-2 rounded-md w-full transition duration-300 ${isSaveEnabled
                                ? "text-white bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-500"
                                : "bg-gray-300 text-white cursor-not-allowed"
                                }`}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSecurity;
