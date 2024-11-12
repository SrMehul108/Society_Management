import React from "react";

function ComplaintEdit({ onClose }) {
  return (
    <div className="" >
      <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 sm:mx-0">
          <h2 className="text-xl font-semibold mb-4">Edit Note</h2>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
               Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
               
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                 Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

           

            <div className="flex justify-end space-x-2">
            <div className="w-1/2 text-center">
            <button 
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            
            </div>
            <div className="w-1/2 text-center">
            <button 
              type="submit"
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              Save
            </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComplaintEdit;
