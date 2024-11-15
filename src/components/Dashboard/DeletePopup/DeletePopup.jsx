import React from "react";

function DeletePopup({  onClose, onDelete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 border-b-2 pb-4 ">Delete Number ?</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this number?</p>
        <div className="flex justify-between">
          <button
            type="button"
            className="px-14 py-2 border rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-14 py-2 bg-red-500 text-white rounded-md"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div> n
    </div>
  );
}

export default DeletePopup;
