import React from 'react';

const PaymentMaintenance = ({ maintenanceAmount, penaltyAmount }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full mb-6 flex flex-col sm:flex-row items-start sm:items-center">
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <h2 className="font-semibold text-lg mb-4">Show Maintenance Details</h2>
      </div>
      <div className="flex w-full sm:w-1/2">
        <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-y-0 sm:space-x-4 justify-end">
          {/* Maintenance Amount */}
          <div className="p-2 border rounded-lg flex flex-col items-center bg-green-50 border-green-200 w-full sm:w-1/2 lg:w-1/3">
            <p className="font-semibold text-gray-700">Maintenance Amount</p>
            <p className="text-2xl font-bold text-green-600">₹ {maintenanceAmount}</p>
          </div>

          {/* Penalty Amount */}
          <div className="p-2 border rounded-lg flex flex-col items-center bg-red-50 border-red-200 w-full sm:w-1/2 lg:w-1/3">
            <p className="font-semibold text-gray-700">Penalty Amount</p>
            <p className="text-2xl font-bold text-red-600">₹ {penaltyAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMaintenance;
