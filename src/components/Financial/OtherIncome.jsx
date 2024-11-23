import React, { useState, useEffect, useRef } from "react";
import OtherIncomePopup from "./OtherIncomePopup";
import EditPopup from "./EditPopup";
import DeletePopup from "./DeletePopup";
import { getotherIncome } from "../../apis/api";

function OtherIncomeCard({ data, onView, onEdit, onDelete }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

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
                onClick={onView}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View
              </button>
              <button
                onClick={onEdit}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Delete
              </button>
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
          Due Date: <span className="font-bold">{data.dueDate}</span>
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
          className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Create Other Income
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {incomeData.map((item, index) => (
          <OtherIncomeCard
            key={index}
            data={item}
            onView={() => console.log(`Viewing ${item.title}`)}
            onEdit={() => onEditIncome(index)}
            onDelete={() => onDeleteIncome(index)}
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getotherIncome();
        setIncomeData(data);
      } catch (error) {
        console.error("Failed to fetch income data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreate = () => {
    setIsPopupOpen(true);
  };

  const handleSaveIncome = (newIncome) => {
    if (editingIndex !== null) {
      const updatedData = [...incomeData];
      updatedData[editingIndex] = newIncome;
      setIncomeData(updatedData);
      setEditingIndex(null);
    } else {
      setIncomeData([...incomeData, newIncome]);
    }
    setIsPopupOpen(false);
  };

  const handleEditIncome = (index) => {
    setEditingIndex(index);
    setIsPopupOpen(true);
  };

  const handleDeleteIncome = (index) => {
    setIncomeData(incomeData.filter((_, i) => i !== index));
  };

  return (
    <div>
      {isPopupOpen && (
        <OtherIncomePopup
          initialData={editingIndex !== null ? incomeData[editingIndex] : null}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSaveIncome}
        />
      )}
      <OtherIncome
        incomeData={incomeData}
        onCreate={handleCreate}
        onEditIncome={handleEditIncome}
        onDeleteIncome={handleDeleteIncome}
      />
    </div>
  );
}
