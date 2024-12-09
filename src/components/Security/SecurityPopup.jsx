import React, { useState, useEffect } from 'react';
import { AddSecurityVisitor } from '../../apis/api';

function SecurityPopup({ closeModal, add }) {
  const [formData, setFormData] = useState({
    visitorName: "",
    phoneNo: "",
    wing: "",
    unit: "",
    date: "",
    time: "",
  });

  // Set the current date and time as defaults when the component mounts
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(' ')[0].slice(0, 5); // HH:mm
    setFormData((prevState) => ({
      ...prevState,
      date: formattedDate,
      time: formattedTime,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
e.preventDefault()
    try {
      const response = await AddSecurityVisitor(formData);
      add()
      closeModal()
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Visitor Details</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Visitor Name*</label>
            <input
              type="text"
              name="visitorName"
              className="w-full border rounded px-3 py-2"
              placeholder="Evelyn Harper"
              value={formData.visitorName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Visitor Number*</label>
            <input
              type="text"
              name="phoneNo"
              className="w-full border rounded px-3 py-2"
              placeholder="Evelyn Harper"
              value={formData.phoneNo}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Wing*</label>
              <input
                type="text"
                name="wing"
                className="border rounded py-2"
                placeholder="Enter Wing"
                value={formData.wing}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Unit*</label>
              <input
                type="text"
                name="unit"
                className="border rounded py-2"
                placeholder="Enter Unit"
                value={formData.unit}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Date*</label>
              <input
                type="date"
                name="date"
                className="border rounded py-2 w-full"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Time*</label>
              <input
                type="time"
                name="time"
                className="border rounded py-2 w-full"
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>
          </div>

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
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md w-full"
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

export default SecurityPopup;
