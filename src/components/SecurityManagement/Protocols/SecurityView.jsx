import React from "react";
import { Icons } from "../../../constants";

function SecurityView({ data, closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">View Security Protocol </h2>
          <button
            onClick={closeModal}
            className="text-gray-500  hover:text-gray-700"
          >
            <span className="text-lg">{Icons.Close}</span>
          </button>
        </div>

        <hr className="mt-6" />

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-400">Title</p>
          <p className="text-base">{data.title}</p>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-400">Description</p>
          <p className="text-base">{data.description}</p>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-6">
          <div>
            <p className="text-sm font-medium text-gray-400">Date</p>
            <p className="text-base font-medium text-gray-700">{data.date}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Time</p>
            <p className="text-sm font-medium text-gray-700">{data.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityView;
