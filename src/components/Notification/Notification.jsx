// Notification.js
import React, { useState, useEffect } from 'react';

const Notification = ({ isVisible, message, type, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed  right-32 p-4 rounded-md shadow-lg w-80 
    ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white font-bold focus:outline-none">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
