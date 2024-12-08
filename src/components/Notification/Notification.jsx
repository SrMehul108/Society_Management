import React, { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed right-36 top-[6%] p-4 rounded-md shadow-lg w-96 h-96 z-50 transition-all duration-300 ease-in-out
      ${type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-white text-black'}`} 
    >
      <div className=" items-center justify-between">
        
      <div className="border-black border">
        <div className="border-red-300 border">
          <div>
            Title
          </div>
          <div>
          <span>{message}</span>
          </div>
          <div>
            Type
          </div>
          <div>
          <span>{type}</span>
          </div>
        </div>
        
          
        </div>
        <button 
          onClick={onClose} 
          className="ml-4 text-white font-bold hover:text-gray-200"
          aria-label="Close notification"
        >
          
        </button>
      </div>
    </div>
  );
};

export default Notification;
