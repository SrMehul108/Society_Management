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
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="ml-4 text-black font-bold hover:text-gray-200"
            aria-label="Close notification"
          >
            &times;
          </button>
        </div>
        <div className=" p-1">
        <div  className="mb-4 border rounded-lg shadow-md p-3 bg-white">
          <div>
            <p className="font-bold text-2xl pb-3">New notification</p>
          </div>
          <div className="p-1 bg-slate-200 font-bold">
            Title
          </div>
          <div className="p-1">
            <span>{message}</span>
          </div>
          <div className="p-1 bg-slate-200 font-bold">
            Type
          </div>
          <div className="p-1">
            <span>{type}</span>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
};

export default Notification;
