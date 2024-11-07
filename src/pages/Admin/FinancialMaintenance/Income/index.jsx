import React, { useState } from 'react';
import { Modal } from '../../../../components/Financial/SetManitenance';
import OtherIncome from '../../../../components/Financial/OtherIncome';
import MaintenanceDetailsPopup from '../../../../components/Financial/ViewPopup';
import ViewPopup from '../../../../components/Financial/ViewPopup';

function FinancialManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOtherIncome, setShowOtherIncome] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOtherIncome = () => {
    setShowOtherIncome(true); // Show the Other Income component
  };

  const handleMaintenance = () => {
    setShowOtherIncome(false); // Show the Maintenance Details table
  };

  //View maintenance
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    title: "Ganesh Chaturthi",
    amount: "₹ 1,500",
    date: "2024-07-01",
    dueDate: "2024-07-10",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in Resident."
  });

  const openViewPopup = () => {
    setIsViewOpen(true);
  };

  const closeViewPopup = () => {
    setIsViewOpen(false);
  };




  const data = [
    {
      profilePicture: "https://via.placeholder.com/32",
      name: "Cody Fisher",
      unit: "A",
      unitNumber: "1001",
      date: "10/02/2024",
      status: "Tenant",
      phoneNumber: "92524 34522",
      amount: 1000,
      penalty: null,
      paymentStatus: "Pending",
      paymentMethod: "Online"
    },
    {
      profilePicture: "https://via.placeholder.com/32",
      name: "Esther Howard",
      unit: "B",
      unitNumber: "1002",
      date: "11/02/2024",
      status: "Owner",
      phoneNumber: "92524 12365",
      amount: 1000,
      penalty: 250,
      paymentStatus: "Done",
      paymentMethod: "Cash"
    },
    {
      profilePicture: "https://via.placeholder.com/32",
      name: "Jenny Wilson",
      unit: "C",
      unitNumber: "1003",
      date: "12/02/2024",
      status: "Tenant",
      phoneNumber: "92589 34522",
      amount: 1000,
      penalty: null,
      paymentStatus: "Pending",
      paymentMethod: "Online"
    },
    // Add more sample data as needed
  ];

  const [maintenanceAmount, setMaintenanceAmount] = useState(0);
  const [penaltyAmount, setPenaltyAmount] = useState(0);
  const handleMaintenanceClick = () => {
    setShowOtherIncome(false);
  };
  const handleOtherIncomeClick = () => {
    setShowOtherIncome(true);
  };

  return (
    <div className="p-4 bg-gray-100">
      {!showOtherIncome && (
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <div className="flex items-center justify-center w-1/2 md:w-auto p-4 m-2 bg-white border-l-4 border-green-500 rounded-lg shadow-sm">
              <div>
                <p className="text-sm text-gray-600">Maintenance Amount</p>
                <p className="text-lg font-bold text-green-500">₹ {maintenanceAmount}</p>
              </div>
            </div>
            <div className="flex items-center justify-center w-1/2 md:w-auto p-4 m-2 bg-white border-l-4 border-red-500 rounded-lg shadow-sm">
              <div>
                <p className="text-sm text-gray-600">Penalty Amount</p>
                <p className="text-lg font-bold text-red-500">₹ {penaltyAmount}</p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="w-full md:w-auto mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition"
          >
            Set Maintenance
          </button>

          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      )}

      <div className="mt-6">
        <div className="bg-gray-100 p-2 rounded-lg flex">
          <button
            className={`px-4 py-2 rounded-lg ${!showOtherIncome ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-200'}`}
            onClick={handleMaintenanceClick}
          >
            Maintenance
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${showOtherIncome ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-200'}`}
            onClick={handleOtherIncomeClick}
          >
            Other Income
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        {showOtherIncome ? (
          <OtherIncome />
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Maintenance Details</h2>
            {/* Maintenance details table goes here */}

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">Name</th>
                    <th className="px-4 py-2 text-left text-gray-600">Unit Number</th>
                    <th className="px-4 py-2 text-left text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left text-gray-600">Status</th>
                    <th className="px-4 py-2 text-left text-gray-600">Phone Number</th>
                    <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                    <th className="px-4 py-2 text-left text-gray-600">Penalty</th>
                    <th className="px-4 py-2 text-left text-gray-600">Status</th>
                    <th className="px-4 py-2 text-left text-gray-600">Payment</th>
                    <th className="px-4 py-2 text-left text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center space-x-2">
                        <img src={item.profilePicture} alt="Profile" className="rounded-full w-8 h-8" />
                        <span className="text-gray-700 font-medium">{item.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-600 px-2 p-1 rounded-full">{item.unit}</span>
                        <span className="text-black px-2 py-1 ">{item.unitNumber}</span>
                      </td>
                      <td className="px-4 py-3">{item.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full ${item.status === 'Tenant' ? 'bg-pink-100 text-pink-600' : 'bg-purple-100 text-purple-600'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.phoneNumber}</td>
                      <td className="px-4 py-3 text-green-500 font-bold">₹{item.amount}</td>
                      <td className="px-4 py-3 text-center">
                        {item.penalty ? (
                          <span className="text-red-500 font-medium">{item.penalty}</span>
                        ) : (
                          <span className="text-gray-500">--</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full ${item.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full ${item.paymentMethod === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.paymentMethod}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-blue-500 cursor-pointer hover:text-blue-700">
                        <button onClick={openViewPopup}>
                          <i className="fas fa-eye"></i>
                        </button>
                        {isViewOpen && (
                          <ViewPopup
                            itemDetails={itemDetails}
                            onClose={closeViewPopup}
                          />
                        )}
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FinancialManagement;
