import React, { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed right-36 top-[6%] p-4 rounded-md shadow-lg w-96 h-96 z-50 transition-all duration-300 ease-in-out
      ${type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-white text-black'}`} // Added 'error' and 'info' types.
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <span>{type}</span>
        <button 
          onClick={onClose} 
          className="ml-4 text-white font-bold hover:text-gray-200"
          aria-label="Close notification"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
