import React, { useState } from 'react';

function ViewSecurity({ closeModal }) {
   

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <div className="flex justify-between items-start mb-4 ">
              <h2 className="text-xl text-black font-semibold">View Expense Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700  text-xl ">&times;</button>
            </div>
            <div className="mt-4">
              <p className="text-gray-500">Title</p>
              <p className="text-sm font-medium text-black">Rent Or Mortgage</p>

              <p className="text-gray-500 mt-4">Description</p>
              <p className="text-sm font-medium text-black">A visual representation of your spending categories.</p>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="text-sm font-medium text-black">01/02/2024</p>
                </div>
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="text-sm font-medium text-black">₹1,500</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-500">Bill</p>
                <div className="flex items-center mt-2 p-2 border rounded-md">
                  <span className="text-black">📄</span>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-black">Adharcard Front Side.JPG</p>
                    <p className="text-gray-400 text-sm">3.5 MB</p>
                  </div>
                  <button className="ml-auto text-gray-500 hover:text-gray-700">ⓘ</button>
                </div>
              </div>
            </div>
          </div>
           
          </div>
      
      );
    }

export default ViewSecurity;
