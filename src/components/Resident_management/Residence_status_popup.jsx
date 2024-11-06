import React, { useState } from 'react';



export const ResidenceSatatusPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [wing, setWing] = useState('');
    const [unit, setUnit] = useState('');
  
    // Dynamic data for dropdowns
    const wings = ['A', 'B', 'C', 'D'];
    const units = ['1001', '1002', '1003', '1004', '1005'];
  
    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      alert(`Wing: ${wing}, Unit: ${unit}`);
      closePopup();
    };
  
    return (
      <div className="flex    bg-gray-100 ">
        {/* Button to open the popup */}
        <button
          onClick={openPopup}
          className="px-6 py-2 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600"
        >
          Residence status popup
        </button>
  
        {/* Popup Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Residence Status</h2>
  
              {/* Dropdown Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-4">
                  {/* Wing Dropdown */}
                  <div className="flex flex-col w-1/2">
                    <label className="text-gray-600 text-sm font-medium">
                      Wing<span className="text-red-500">*</span>
                    </label>
                    <select
                      value={wing}
                      onChange={(e) => setWing(e.target.value)}
                      className="mt-1 p-2 border rounded-lg focus:border-orange-500"
                      required
                    >
                      <option value="" disabled>Select Wing</option>
                      {wings.map((wingOption) => (
                        <option key={wingOption} value={wingOption}>
                          {wingOption}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  {/* Unit Dropdown */}
                  <div className="flex flex-col w-1/2">
                    <label className="text-gray-600 text-sm font-medium">
                      Unit<span className="text-red-500">*</span>
                    </label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="mt-1 p-2 border rounded-lg focus:border-orange-500"
                      required
                    >
                      <option value="" disabled>Select Unit</option>
                      {units.map((unitOption) => (
                        <option key={unitOption} value={unitOption}>
                          {unitOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
  
                {/* Buttons */}
                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="px-4 py-2 w-full text-center font-semibold text-gray-600 border  rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 w-full text-center font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg hover:from-orange-500 hover:to-orange-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }