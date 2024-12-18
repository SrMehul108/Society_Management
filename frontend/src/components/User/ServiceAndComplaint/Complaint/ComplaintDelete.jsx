import React, { useState } from 'react';
import { DeleteUserComplaint } from '../../../../apis/api';

function DeleteConfirmationPopup({ closeModal,HandleAdd,IssueId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleDelete = async() => {
   if (!IssueId) {
    setError("ID is missing.");
      return;
   }
   setIsLoading(true);
   setError(null);
    try {
      await DeleteUserComplaint(IssueId)
      HandleAdd()
      closeModal()
    }catch (err) {
      setError("Failed to delete the expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 sm:p-6 rounded-lg max-w-sm w-full mx-4 sm:mx-0 shadow-lg">
      {error && <p className="text-red-500 mb-4">{error}</p>}
        <h2 className="text-lg sm:text-xl font-semibold mb-2 border-b-2 pb-2">Delete Request?</h2>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Are you sure you want to delete this Request?</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-md text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full sm:w-1/2 px-4 py-2 bg-red-500 text-white rounded-md text-sm sm:text-base"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
