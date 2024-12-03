import React, { useState, useEffect } from "react";
import {  UpdateFacilty } from "../../apis/api";

function EditFacility({ onClose, facility, facilityId, EditData, onFacilityAdded }) {
  // Set the initial state for the form fields based on the passed facility data
  const [formData, setFormData] = useState({
    facilityName: facility ? facility.facilityName : "",
    description: facility ? facility.description : "",
    serviceDate: facility ? facility.date : "",
    remindBefore: facility ? facility.remindBefore : "1-day",  // Default value based on facility data
  });

  // Update form data when the facility prop changes
  useEffect(() => {
    if (facility) {
      setFormData({
        facilityName: facility.facilityName,
        description: facility.description,
        serviceDate: facility.date,
        remindBefore: facility.remindBefore || "1-day", // Use existing or default
      });
    }
  }, [facility]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Call the API to update the facility
      const response = await UpdateFacilty(formData, facilityId);
      
      // Check if the update was successful (adjust as needed based on API response)
      if (response && response.success) {
        onFacilityAdded(); // Trigger parent callback to refresh facility list
        onClose(); // Close the popup
      } else {
        console.error("Failed to update the facility");
      }
    } catch (error) {
      console.error("Error updating facility:", error);
      // Optionally, you can set an error state to show the user
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 sm:mx-0">
        <h2 className="text-xl font-semibold mb-4">Edit Facility</h2>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Facility Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter facility name"
              value={formData.facilityName}
              onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
              required
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
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Schedule Service Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.serviceDate}
              onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Remind Before
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.remindBefore}
              onChange={(e) => setFormData({ ...formData, remindBefore: e.target.value })}
            >
              <option>1-day</option>
              <option>2-day</option>
              <option>3-day</option>
              <option>4-day</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFacility;
