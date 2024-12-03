import React from "react";

function AnnouncementEdit({ onClose }) {
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Announcement</h2>
    
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Announcement Title<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter Note name"
                  required
                />
              </div>
    
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Description<span className="text-red-500">*</span></label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter description"
                  rows="3"
                  required
                ></textarea>
              </div>
    
             <div className="flex space-x-2">
             <div className="mb-4 w-1/2">
                <label className="block text-gray-700 font-medium mb-1">Announcement Date<span className="text-red-500">*</span></label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
              <div className="mb-4 w-1/2">
                <label className="block text-gray-700 font-medium mb-1">Announcement Time<span className="text-red-500">*</span></label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
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
                  className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white rounded-lg"
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

export default AnnouncementEdit;
