import React, { useState, useEffect } from "react";
import { addExpense } from "../../../apis/api"; // Ensure this function is capable of handling FormData

const AddExpanse = ({ isOpen, onClose, itemToEdit, onAddExpanse }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    amount: "",
    uploadBill: null, // Initialize with null for file
  });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        title: itemToEdit.title,
        description: itemToEdit.description,
        amount: itemToEdit.amount,
        date: itemToEdit.date,
        uploadBill: itemToEdit.uploadBill || null, // Add file handling if editing
      });
    } else {
      setFormData({
        title: "",
        description: "",
        amount: "",
        date: "",
        uploadBill: null,
      });
    }
  }, [itemToEdit]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value, // Handle file input
    }));
  };

  useEffect(() => {
    const { title, description, date, amount, uploadBill } = formData;
    setIsSaveEnabled(
      title && description && date && amount && uploadBill // Ensure file is also considered
    );
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check for required fields, including file upload
    if (
      !formData.title ||
      !formData.date ||
      !formData.description ||
      !formData.amount ||
      !formData.uploadBill
    ) {
      setError("All fields are required!");
      return;
    }

    // Create a FormData object to send the form data (including file)
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("amount", formData.amount);
    formDataToSend.append("uploadBill", formData.uploadBill);

    try {
      const response = await addExpense(formDataToSend); // Ensure addExpense handles FormData
      onAddExpanse();
      onClose();
      console.log("Expense added successfully:", response);
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative z-60">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2 border-opacity-10">
          {itemToEdit ? "Edit Expense Details" : "Add Expense Details"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium">
              Description<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter Description"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-medium">
                Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium">
                Amount<span className="text-red-500">*</span>
              </label>
              <input
                type="number" // Changed to number for better validation
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="₹ 0000"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Upload Bill</label>
            <div className="text-center items-center justify-center border-dashed border-2 border-gray-300 rounded-lg p-10">
              <input
                type="file"
                className="hidden"
                id="file-upload"
                name="uploadBill"
                onChange={handleInputChange} // Handle file change
              />
              <label
                htmlFor="file-upload"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Upload a file or drag and drop
              </label>
              <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}
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
                className={`px-4 py-2 rounded-md w-full transition duration-300 ${
                  isSaveEnabled
                    ? " text-white  bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500"
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

export default AddExpanse;
