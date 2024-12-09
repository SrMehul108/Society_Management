import React, { useState } from 'react';



export const DeletePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
 const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);
  
    
  
    return (
      <div className="flex    bg-gray-100 ">
        {/* Button to open the popup */}
        <button
          onClick={openPopup}
          className="px-6 py-2 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600"
        >
          Delete popup
        </button>
  
        {/* Popup Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Do you want to vacate the finlay flat?</h2>
  
              {/* Dropdown Form */}
             
             <div className='w-full border-t-2 pt-4 '>
                <div>
                    <p className='text-sm'>
                        Are You Sure You Want to delate all Details? 
                    </p>
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
                    Conform
                  </button>
                </div>
              
            </div>
          </div>
        )}
      </div>
    );
  }