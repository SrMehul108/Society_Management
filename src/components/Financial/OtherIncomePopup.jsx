import React from "react";

function OtherIncomePopup({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Create Other Income</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Title<span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Ganesh Chaturthi"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Date<span className="text-red-500">*</span></label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Due Date<span className="text-red-500">*</span></label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Description<span className="text-red-500">*</span></label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              rows="3"
              placeholder="The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in Resident."
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Amount<span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="₹ 1,500"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtherIncomePopup;
