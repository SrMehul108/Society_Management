import React from 'react';

function ViewRequestPopup({ data, closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <div className="flex justify-between items-start mb-4 ">
          <h2 className="text-xl font-semibold">View Request</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700  text-xl ">&times;</button>
        </div>

        <div className="flex items-center mb-4">
          <img
            src={data.avatarUrl}
            alt={data.name}
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <p className="text-lg font-medium">{data.name}</p>
            <p className="text-sm text-gray-500">{data.date}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Request Name</p>
          <p className="text-base">{data.requestName}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Description</p>
          <p className="text-base">{data.description}</p>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-sm font-medium text-gray-700">Wing</p>
            <p className="text-base font-medium text-blue-600">{data.wing}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Unit</p>
            <p className="text-base font-medium text-black-600">{data.unit}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Priority</p>
            <p className="text-base font-medium border rounded-full bg-blue-500 text-white">{data.priority}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Status</p>
            <p className="text-base font-medium text-blue-600 border rounded-full bg-blue-50">{data.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRequestPopup;
