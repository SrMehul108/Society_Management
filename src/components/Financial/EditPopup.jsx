import React, { useState } from "react";
import { updateIncome } from "../../apis/api";

function EditPopup({ formData, onClose, onSave }) {
  const [editData, setEditData] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateIncome(editData);
      console.log(response);
      if (response.success) {
        onSave(editData); // Notify parent component of changes
        onClose(); // Close the popup after saving
      } else {
        alert(response.message || "Failed to update income.");
      }
    } catch (error) {
      console.error("Error saving income:", error);
      alert("An error occurred while saving. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg text-black shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Edit</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={editData.title || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Amount<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={editData.amount || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={editData.date || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Due Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={editData.dueDate || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={editData.description || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              rows="3"
              placeholder="Enter description"
              required
            />
          </div>
          <div className="flex  gap-2">
            <div className="w-1/2">
              <button
                type="button"
                className="px-4 py-2 w-full  bg-gray-300 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>

            </div>
            <div className="w-1/2">
              <button
                type="submit"
                className="px-4 py-2 w-full bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPopup;
