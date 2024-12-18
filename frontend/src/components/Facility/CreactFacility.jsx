import React, { useState } from "react";
import { addFacility } from "../../apis/api";

function FacilityPopup({ onClose, onFacilityAdded }) {
  const [formData, setFormData] = useState({
    facilityName: "",
    description: "",
    date: "",
    reminderDay: "1", // Set default value for reminder
  });
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (
      !formData.facilityName ||
      !formData.description ||
      !formData.date ||
      !formData.reminderDay
    ) {
      setError("All fields are required!");
      return;
    }
    setIsSaving(true);
    try {
      const response = await addFacility(formData);
      onFacilityAdded();
      onClose();
    } catch (error) {
      console.error("Error adding facility:", error);
      setError("Failed to add facility. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Create Facility</h2>
        <form onSubmit={handlesubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Facility Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter facility name"
              required
              name="facilityName"
              value={formData.facilityName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter description"
              rows="3"
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Schedule Service Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Remind Before
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              name="reminderDay"
              value={formData.reminderDay}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="flex  space-x-2">
            <div className="w-1/2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg w-full"
              >
                Cancel
              </button>

            </div>
            <div className="w-1/2">
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white rounded-lg w-full"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FacilityPopup;
