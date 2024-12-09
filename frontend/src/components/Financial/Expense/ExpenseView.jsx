import React from "react";
import { Icons } from "../../../constants";

function ExpenseView({ closeModal, item }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-black font-semibold">
            View Expense Details
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
      
          </button>
        </div>
        <hr />
        <div className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <p className="text-gray-500 text-sm">Title</p>
            <p className="text-black text-base font-medium">{item.title}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-500 text-sm">Description</p>
            <p className="text-black text-base font-medium">
              {item.description}
            </p>
          </div>

          {/* Date and Amount */}
          <div className="flex w-60 justify-between items-center">
            <div>
              <p className="text-gray-500 text-base">Date</p>
              <p className="text-black text-base font-medium">{item.date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-base">Amount</p>
              <p className="text-black text-base font-medium bg-gray-200 rounded-full px-6">₹{item.amount}</p>
            </div>
          </div>

          {/* Bill */}
          <div>
            <p className="text-gray-500 text-sm">Bill</p>
            <div className="flex items-center mt-2 p-2 border rounded-md w-full overflow-hidden">
              {/* Icon Container */}
              <div className="p-2 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-500 text-xl">📄</span>
              </div>

              {/* File Details */}
              <div className="ml-3 flex-1">
                <p className="text-black text-center text-sm font-medium break-all">
                  {item.title}
                </p>
              </div>

              {/* View Icon */}
              <div className="ml-auto">
                <a
                  href={item.uploadBill}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-black text-lg"
                >
                  {Icons.View || "🔍"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseView;
