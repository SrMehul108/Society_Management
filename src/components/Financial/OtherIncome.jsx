import React, { useState, useEffect, useRef } from "react";
import OtherIncomePopup from "./OtherIncomePopup";
import { getotherIncome, addincome, deleteIncome } from "../../apis/api";
import EditPopup from "./EditPopup";
import DeletePopup from "./DeletePopup";

function OtherIncomeCard({ data, onView, onEdit, onDelete }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  const openEditPopup = () => setIsEditOpen(true);
  const closeEditPopup = () => setIsEditOpen(false);

  const openDeletePopup = () => setIsDeleteOpen(true);
  const closeDeletePopup = () => setIsDeleteOpen(false);

  const handleDelete = () => {
    onDelete();
    closeDeletePopup();
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col space-y-2 m-2">
      <div className="flex justify-between items-center py-3 px-4 bg-blue-500 text-white rounded-t-lg">
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <div className="relative" ref={menuRef}>
          <i
            className="fas fa-ellipsis-h text-white p-2 rounded-xl cursor-pointer"
            onClick={toggleMenu}
          ></i>
          {menuVisible && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
              <button
                onClick={openEditPopup}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
              {isEditOpen && (
                <EditPopup
                  formData={data}
                  onClose={closeEditPopup}
                  onSave={(updatedData) => {
                    onEdit(updatedData);
                    closeEditPopup();
                  }}
                />
              )}
              <button
                onClick={openDeletePopup}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Delete
              </button>
              {isDeleteOpen && (
                <DeletePopup
                  itemTitle={data.title}
                  onClose={closeDeletePopup}
                  onDelete={handleDelete}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-500">
          Amount Per Member: <span className="font-bold">₹ {data.amount}</span>
        </p>
        <p className="text-gray-500">
          Total Members: <span className="font-bold">{data.totalMembers}</span>
        </p>
        <p className="text-gray-500">
          Date: <span className="font-bold">{data.date}</span>
        </p>
        <p className="text-gray-500">
          Due Date:{" "}
          <span className="font-bold">
            {new Date(data.dueDate).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </span>
        </p>
        <p className="text-gray-500">
          Description: <span className="font-bold">{data.description}</span>
        </p>
      </div>
    </div>
  );
}

function OtherIncome({ incomeData, onCreate, onEditIncome, onDeleteIncome }) {
  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Other Income</h2>
        <button
          onClick={onCreate}
          className="px-6 py-2 text-white font-semibold rounded-lg shadow-md transition bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-500"
        >
          Create Other Income
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {incomeData.map((income, index) => (
          <OtherIncomeCard
            key={income.id || index}
            data={income}
            onView={() => console.log(`Viewing ${income.title}`)}
            onEdit={(updatedData) => onEditIncome(index, updatedData)}
            onDelete={() => onDeleteIncome(index, income.id)} // Call delete handler
          />
        ))}
      </div>
    </div>
  );
}

export default function OtherIncomeContainer() {
  const [incomeData, setIncomeData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getotherIncome();
        setIncomeData(data);
      } catch (error) {
        console.error("Failed to fetch income data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    fetchData()
  }, []);

  // Handle facility added in the popup form
  const handleOtherIncomeAdded = () => {
    fetchData(); // Re-fetch the facilities after a new one is added
    closePopup(); // Close the popup
  };
  const handleCreate = () => {
    setIsPopupOpen(true);
  };

  const handleSaveIncome = async (income) => {
    try {
      if (editingIndex !== null) {
        const updatedData = [...incomeData];
        updatedData[editingIndex] = income;
        setIncomeData(updatedData);
        setEditingIndex(null);
      } else {
        const createdIncome = await addincome(income);
        if (createdIncome?.id) {
          setIncomeData([...incomeData, createdIncome]);
        } else {
          console.error("Failed to add income");
        }
      }
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error saving income:", error);
    }
  };

  const handleDeleteIncome = async (index, id) => {
    try {
      await deleteIncome({ _id: id });
      const updatedData = incomeData.filter((_, i) => i !== index);
      setIncomeData(updatedData);
      console.log(`Income with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete income with ID ${id}:`, error);
    }
  };

  const handleEditIncome = (index, updatedData) => {
    const updatedIncome = [...incomeData];
    updatedIncome[index] = updatedData;
    setIncomeData(updatedIncome);
  };

  return (
    <div>
      {isPopupOpen && (
        <OtherIncomePopup
          initialData={editingIndex !== null ? incomeData[editingIndex] : null}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSaveIncome}
          onIncomeAdded={handleOtherIncomeAdded}
        />
      )}
      <OtherIncome
        incomeData={incomeData}
        onCreate={handleCreate}
        onEditIncome={handleEditIncome}
        onDeleteIncome={handleDeleteIncome} 
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
}
