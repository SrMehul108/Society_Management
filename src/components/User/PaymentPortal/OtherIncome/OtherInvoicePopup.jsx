import React from 'react';

const OtherInvoicePopupView = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Maintenance Invoices</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Invoice Id</p>
              <p>{data.invoiceId}</p>
            </div>
            <div>
              <p className="font-semibold">Owner Name</p>
              <p>{data.ownerName}</p>
            </div>
            <div>
              <p className="font-semibold">Bill Date</p>
              <p>{data.billDate}</p>
            </div>
            <div>
              <p className="font-semibold">Payment Date</p>
              <p>{data.paymentDate}</p>
            </div>
            <div>
              <p className="font-semibold">Phone Number</p>
              <p>{data.phoneNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p>{data.email}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold">Address</p>
              <p>{data.address}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <div className="flex justify-between text-sm font-semibold">
            <p>Maintenance Amount</p>
            <p className="text-green-500">₹ {data.maintenanceAmount}</p>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <p>Penalty</p>
            <p className="text-red-500">₹ {data.penalty}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t mt-2 pt-2">
            <p>Grand Total</p>
            <p>₹ {data.grandTotal}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="text-sm font-semibold">Note</p>
          <p className="text-sm">{data.note}</p>
        </div>

        <button className="w-full py-3 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
          <span role="img" aria-label="download">⬇️</span> Download Invoice
        </button>
      </div>
    </div>
  );
};

export default OtherInvoicePopupView;
