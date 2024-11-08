import React from "react";

function EditPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 sm:mx-0">
        <h2 className="text-xl font-semibold mb-4">Edit Facility</h2>
        
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Facility Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter facility name"
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
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Remind Before
            </label>
            <select className="w-full border border-gray-300 rounded-lg p-2">
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

export default EditPopup;
