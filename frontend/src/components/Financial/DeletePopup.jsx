import React from "react";

function DeletePopup({ itemTitle = "item", onClose, onDelete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 border-b-2 pb-4">
          Delete <span className="text-red-500">{itemTitle}</span>?
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this {itemTitle}? This action cannot
          be undone.
        </p>
        <div className="flex justify-between">
         <div className="flex items-center w-full gap-2">
         <div className="w-1/2">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md w-full"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          <div className="w-1/2">

            <button
              type="button"
              className="px-6 py-2 bg-red-500 text-white rounded-md w-full"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
