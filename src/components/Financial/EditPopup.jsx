import React, { useState } from "react";
import { updateIncome } from "../../apis/api";
 // Adjust the import path based on your project structure

function EditPopup({ formData, onClose, onSave }) {
  const [editData, setEditData] = useState(formData);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedData = await updateIncome(editData);
      onSave(updatedData); // Call parent onSave with updated data
      onClose(); // Close the popup
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg text-black shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Edit</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Amount<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="amount"
              value={editData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="₹ 1,500"
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
                value={editData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Due Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={editData.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              rows="3"
              placeholder="Description of the event"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md ${loading ? "bg-gray-400" : "bg-orange-500 text-white"}`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPopup;
