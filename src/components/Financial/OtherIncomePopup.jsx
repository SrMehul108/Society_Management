import React, { useState } from "react";
import { addincome } from "../../apis/api";
import { useNavigate } from "react-router";
import OtherIncome from "../../pages/User/PaymentPortal/OtherIncome";

function OtherIncomePopup({ onClose, onIncomeAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    dueDate: "",
    description: "",
    amount: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.date || !formData.dueDate || !formData.description || !formData.amount) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await addincome(formData);
      onIncomeAdded()
      onClose()
      console.log("Income added successfully:", response);
    } catch (error) {
      console.error("Error adding income:", error);
      setError("Failed to add income. Please try again.");
      console.log(error)
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Create Other Income</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Ganesh Chaturthi"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Due Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              rows="3"
              placeholder="The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in Resident."
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Amount<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="1500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex  gap-2">
            <div className="w-1/2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 w-full"
                onClick={onClose}
              >
                Cancel
              </button>

            </div>
            <div className="w-1/2">
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 w-full"
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


export default OtherIncomePopup;
