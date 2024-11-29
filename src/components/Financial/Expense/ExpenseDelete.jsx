import { useState } from "react";
import { deleteExpense } from "../../../apis/api";
import { toast, ToastContainer } from "react-toastify";

function ExpenseDelete({ closeModal, expenseId, fetchExpense }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!expenseId) {
      setError("Expense ID is missing.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await deleteExpense(expenseId); 
      toast.success("Deleted Successfully");

      fetchExpense(); 
      closeModal();
    } catch (err) {
      setError("Failed to delete the expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg ">
        <h2 className="text-xl font-semibold mb-2 border-b-2 pb-2">Delete Request?</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this Request?</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ExpenseDelete;