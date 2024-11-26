import React, { useEffect, useState } from "react";
import AddExpanse from "../../../../components/Financial/Expense/AddExpenses";
import ExpenseDelete from "../../../../components/Financial/Expense/ExpenseDelete";
import ExpenseView from "../../../../components/Financial/Expense/ExpenseView";
import { getExpense } from "../../../../apis/api";

export default function Expanse() {
  // Modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Tracks the item to be edited
  const [expense, setExpense] = useState({});

  const openModal = (item = null) => {
    setEditingItem(item); // If item is passed, open in edit mode
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const data= await getExpense()
        setExpense(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpense();
  }, []);

  const closeModal = () => {
    setEditingItem(null);
    setIsModalOpen(false);
  };

  // delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  // view
  const [isViewOpen, setIsViewOpen] = useState(false);
  const openViewModal = () => setIsViewOpen(true);
  const closeViewModal = () => setIsViewOpen(false);

  return (
    <>
      <div className="p-4 bg-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0">
          <button
            onClick={() => openModal()} // Opens modal for adding new expense
            className="w-full md:w-auto mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition"
          >
            Add New Expenses details
          </button>
        </div>

        {/* Modal for adding or editing expense */}
        {isModalOpen && (
          <AddExpanse
            isOpen={isModalOpen}
            onClose={closeModal}
            itemToEdit={editingItem}
          />
        )}

        <div
          role="tablist"
          className="mt-4 tabs tabs-lifted tabs-lg rounded-lg"
        >
          <div
            className="bg-white p-4 overflow-hidden"
            style={{ height: "680px" }}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add Expenses details
            </h2>

            <div
              className="overflow-x-auto rounded-lg h-full"
              style={{ maxHeight: "600px" }}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-royalgray sticky top-0 w-full">
                  <tr>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Title
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Description
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Bill Format
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 h-64 overflow-y-auto custom-scrollbar">
                  {expense.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center space-x-2">
                        <span className="text-gray-700 font-medium">
                          {item.title}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-black px-2 py-1">
                          {item.description}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.date}</td>
                      <td className="px-4 py-3 text-green-500 font-bold">
                        ₹{item.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            item.billFormat === "pdf"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {item.billFormat}
                        </span>
                      </td>
                      <td className=" text-sm text-blue-500 cursor-pointer hover:text-blue-700 ">
                        <button
                          onClick={() => openModal(item)} // Edit button
                          className="text-green-500 hover:text-green-700 p-1"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          className="text-blue-500 hover:text-blue-700 p-1"
                          onClick={openViewModal}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        {isViewOpen && (
                          <ExpenseView closeModal={closeViewModal} />
                        )}
                        <button
                          className="text-red-500 hover:text-red-700 p-1"
                          onClick={openDeleteModal}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        {isDeleteOpen && (
                          <ExpenseDelete closeModal={closeDeleteModal} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
