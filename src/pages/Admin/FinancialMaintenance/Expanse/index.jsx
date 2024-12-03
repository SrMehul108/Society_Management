import React, { useEffect, useState } from "react";
import AddExpanse from "../../../../components/Financial/Expense/AddExpenses";
import ExpenseDelete from "../../../../components/Financial/Expense/ExpenseDelete";
import ExpenseView from "../../../../components/Financial/Expense/ExpenseView";
import { getExpense } from "../../../../apis/api";
import { Icons } from "../../../../constants";
import EditExpenses from "../../../../components/Financial/Expense/EditExpenses";

function Expanse() {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [expense, setExpense] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Fetch expenses
  const fetchExpense = async () => {
    try {
      const data = await getExpense();
      setExpense(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  // Modal Handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [editId, setEditId] = useState();
  const openEditModal = (item) => {
    setEditingItem(item);
    setEditId(item._id);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setIsEditOpen(false);
  };

  const openViewModal = (item) => {
    setViewItem(item);
    setIsViewOpen(true);
  };

  const closeViewModal = () => {
    setViewItem(null);
    setIsViewOpen(false);
  };

  const openDeleteModal = (id) => {
    setDeleteItemId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteOpen(false);

  const handleExpenseAdded = () => {
    fetchExpense();
    closeModal();
  };

  const handleExpenseUpdated = () => {
    fetchExpense();
    closeEditModal();
  };

  return (
    <div className=" bg-gray-100">
      {/* Modals */}
      {isModalOpen && (
        <AddExpanse
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddExpanse={handleExpenseAdded}
        />
      )}

      {isViewOpen && viewItem && (
        <ExpenseView closeModal={closeViewModal} item={viewItem} />
      )}

      {isDeleteOpen && (
        <ExpenseDelete
          closeModal={closeDeleteModal}
          expenseId={deleteItemId}
          fetchExpense={fetchExpense}
        />
      )}

      {isEditOpen && editingItem && (
        <EditExpenses
          isOpen={isEditOpen}
          onClose={closeEditModal}
          itemToEdit={editingItem}
          expenseId={editingItem._id}
          onExpenseUpdated={handleExpenseUpdated}
        />
      )}

      {/* Expense Table */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">
           Add Expense Details
          </h2>
          <button
            onClick={openModal}
            className="flex items-center gap-2 p-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
          >
            <span>{Icons.Add}</span>
            Add New Expense Details
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg max-h-[600px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className=" sticky top-0" style={{backgroundColor:"#eef1fd"}}>
              <tr>
                {[
                  "Title",
                  "Description",
                  "Date",
                  "Amount",
                  "Bill Format",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-2 text-left text-black font-semibold"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expense.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3 text-green-500 font-bold">
                    ₹{item.amount}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className="flex items-center gap-2 px-2 py-1 rounded-full">
                        {/* Conditional Icon based on file extension */}
                        {item.uploadBill?.toLowerCase().endsWith(".pdf")
                          ? Icons.PDF
                          : Icons.PNG}
                      </span>
                      <span className="ml-2 font-bold">
                        {(
                          item.uploadBill?.split(".").pop() || ""
                        ).toUpperCase()}
                      </span>
                    </div>
                  </td>

                  <td className="flex space-x-2 px-4 py-3">
                    <button
                      onClick={() => openEditModal(item, item._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => openViewModal(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      onClick={() => openDeleteModal(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Expanse;
