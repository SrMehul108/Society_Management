import React from "react";
import { DeleteComplaint } from "../../apis/api";

function DeleteConfirmationPopup({ data, closeModal, onComplaintAdd }) {
  const handleDelete = async () => {
    if (!data || !data._id) {
      // Check for _id instead of id
      console.error("Complaint ID (_id) is missing");
      return;
    }
    try {
      const result = await DeleteComplaint(data._id); // Use _id for the delete request

      closeModal();
      onComplaintAdd();
    } catch (error) {
      console.error("Error deleting complaint:", error);
      alert("An error occurred while deleting the complaint");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg ">
        <h2 className="text-xl font-semibold mb-2 border-b-2 pb-2">
          Delete Request?
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this Request?
        </p>
        <div className="flex gap-2">
          <div className="flex justify-center gap-4 mt-4 w-1/2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded-md w-full"
            >
              Cancel
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-4 w-1/2">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md w-full"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
