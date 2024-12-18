import React, { useState, useEffect } from "react";
import { addsecurity } from "../../apis/api";

const AddSecurity = ({ isOpen, onClose, itemToEdit,onAddGuard }) => {
  if (!isOpen) return null;

  const [formValues, setFormValues] = useState({
    shiftDate: "", // Match schema field name
    shiftTime: "", // Match schema field name
    email: "", // Add email as a required field
    fullName: "",
    phoneNo: "",
    profile_image: null,
    aadharImage_front: null,
    shift: "day", // Use lowercase values as per schema enum
    gender: "male", // Use lowercase values as per schema enum
  });

  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  // Set initial values when editing an item
  useEffect(() => {
    if (itemToEdit) {
      setFormValues({
        ...itemToEdit,
        profile_image: null, // Reset file inputs
        aadharImage_front: null,
      });
    } else {
      setFormValues({
        shiftDate: "", // Match schema field name
        shiftTime: "", // Match schema field name
        email: "", // Add email as a required field
        fullName: "",
        phoneNo: "",
        profile_image: null,
        aadharImage_front: null,
        shift: "day", // Use lowercase values as per schema enum
        gender: "male", // Use lowercase values as per schema enum
      });
    }
  }, [itemToEdit]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: files ? files[0] : value, // Handle both file and text inputs
    }));
    setIsSaveEnabled(true); // Enable Save button when changes occur
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await addsecurity(formData);
      if (response.success) {
        onAddGuard()
        onClose();
      } else {
        alert(`Failed to add security: ${response.message}`);
      }
    } catch (error) {
      alert(`Error adding security: ${error.message}`);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative z-60">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2 border-opacity-10">
          {itemToEdit ? "Edit Security" : "Add Security"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="flex items-center">
            <div className="w-20 h-20 border rounded-full mr-5">
              {formValues.profile_image && (
                <img
                  src={URL.createObjectURL(formValues.profile_image)}
                  alt="Profile Preview"
                  className="w-full h-full rounded-full object-cover"
                />
              )}
            </div>
            <div className="items-center justify-center">
              <input
                type="file"
                name="profile_image"
                className="hidden"
                id="file-upload"
                onChange={handleInputChange}
              />
              <label
                htmlFor="file-upload"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Add photo
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block font-medium">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formValues.fullName}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNo"
              value={formValues.phoneNo}
              onChange={handleInputChange}
              placeholder="+9125689632"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Gender and Shift */}
          <select
            name="gender"
            value={formValues.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            name="shift"
            value={formValues.shift}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="day">Day</option>
            <option value="night">Night</option>
          </select>

          {/* Date and Time */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-medium">
                Shift Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="shiftDate"
                value={formValues.shiftDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="time" className="block text-sm font-medium pb-2">
                Shift Time<span className="text-red-500">*</span>
              </label>
              <input
                id="time"
                type="time"
                name="shiftTime"
                value={formValues.shiftTime}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Aadhaar Card Upload */}
          <div>
            <label className="block font-medium">Upload Aadhaar Card*</label>
            <div className="text-center items-center justify-center border-dashed border-2 border-gray-300 rounded-lg p-10">
              <input
                type="file"
                name="aadharImage_front"
                className="hidden"
                id="aadhaar-upload"
                onChange={handleInputChange}
              />
              <label
                htmlFor="aadhaar-upload"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Upload a file or drag and drop
              </label>
              <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
            </div>
            {formValues.billFile && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {formValues.aadharImage_front.name}
              </p>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
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
              disabled={!isSaveEnabled}
              className={`px-4 py-2 rounded-md w-full transition duration-300 ${
                isSaveEnabled
                  ? "text-white bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-500"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              {itemToEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSecurity;
