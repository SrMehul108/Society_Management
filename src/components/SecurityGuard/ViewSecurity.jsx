import React, { useState } from "react";

function ViewSecurity({ closeModal, item }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <div className="flex justify-between items-start mb-4 ">
          <h2 className="text-xl text-black font-semibold">
            View Security Guard Details
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700  text-xl "
          >
            &times;
          </button>
        </div>
        <div className="mt-4">
          <div className="flex items-center ">
            <div className="w-20 h-20 border rounded-full mr-5 overflow-hidden">
              <div>
                <img src={item.profile_image} alt=""  />
              </div>
            </div>
            <div className=" items-center justify-center ">
              <p className="text-black font-bold">{item.fullName}</p>
              <p className="text-gray-500">{item.securityData.shiftDate}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-gray-500">Select Shift</p>
              <p className="text-sm font-medium text-black">
                {item.securityData.shift}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Shift Time</p>
              <p className="text-sm font-medium text-black">
                {item.securityData.shiftTime}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Gender</p>
              <p className="text-sm font-medium text-black">{item.gender}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSecurity;
