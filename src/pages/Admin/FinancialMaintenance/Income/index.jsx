import React, { useState } from "react";
import { Modal } from "../../../../components/Financial/SetManitenance";
import OtherIncome from "../../../../components/Financial/OtherIncome";
import MaintenanceDetailsPopup from "../../../../components/Financial/ViewPopup";
import ViewPopup from "../../../../components/Financial/ViewPopup";
import { CashButton, DoneButton, EmptyButton, OnlineButton, OwnerButton, PenalityButton, PendingButton, TenantButton } from "../../../../components/Button/Button";

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
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in Resident.",
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
      paymentMethod: "Online",
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
      penalty: "250",
      paymentStatus: "Done",
      paymentMethod: "Cash",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
    },
    {
      profilePicture: "https://via.placeholder.com/32",
      name: "Jenny Wilson",
      unit: "C",
      unitNumber: "1003",
      date: "12/02/2024",
      status: "Owner",
      phoneNumber: "92589 34522",
      amount: 1000,
      penalty: null,
      paymentStatus: "Pending",
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "Online",
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
      paymentMethod: "cash",
    },
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
    <>
      <div className="p-4 bg-gray-100">
        {!showOtherIncome && (
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex">
              <div className="flex items-center justify-center w-1/2 md:w-auto p-4 m-2 bg-white border-l-4 border-green-500 rounded-lg shadow-sm">
                <div>
                  <p className="text-sm text-gray-600 ">Maintenance Amount</p>
                  <p className="text-lg font-bold text-green-500">
                    ₹ {maintenanceAmount}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center w-1/2 md:w-auto p-4 m-2 bg-white border-l-4 border-red-500 rounded-lg shadow-sm">
                <div>
                  <p className="text-sm text-gray-600  w-36">Penalty Amount</p>
                  <p className="text-lg font-bold text-red-500">
                    ₹ {penaltyAmount}
                  </p>
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

        <div
          role="tablist"
          className="mt-4 tabs tabs-lifted tabs-lg  rounded-lg"
        >
          <div className="w-72 flex">
            <a
              role="tab"
              className={` py-2 px-4 tab rounded-t border-b-2 border-b-orange-500  ${!showOtherIncome
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-gray-200"
                }`}
              onClick={handleMaintenanceClick}
            >
              Maintenance
            </a>
            <a
              role="tab"
              className={` py-2 px-4 tab rounded-t border-b-2 border-b-orange-500  ${showOtherIncome
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-gray-200"
                }`}
              onClick={handleOtherIncomeClick}
            >
              Other Income
            </a>
          </div>

          {showOtherIncome ? (
            <OtherIncome />
          ) : (
            <>
              <div
                className="bg-white p-4 overflow-hidden"
                style={{ height: "680px" }}
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Maintenance Details
                </h2>

                <div
                  className="overflow-x-auto rounded-lg h-full"
                  style={{ maxHeight: "600px" }}
                >
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-royalgray sticky top-0 w-full">
                      <tr>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Unit Number
                        </th>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Phone Number
                        </th>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Amount
                        </th>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Penalty
                        </th>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Payment
                        </th>
                        <th className="px-4 py-2 text-left text-black font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 h-64 overflow-y-auto custom-scrollbar">
                      {data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 flex items-center space-x-2">
                            <img
                              src={item.profilePicture}
                              alt="Profile"
                              className="rounded-full w-8 h-8"
                            />
                            <span className="text-gray-700 font-medium">
                              {item.name}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="bg-blue-100 text-blue-600 px-2 p-1 rounded-full">
                              {item.unit}
                            </span>
                            <span className="text-black px-2 py-1">
                              {item.unitNumber}
                            </span>
                          </td>
                          <td className="px-4 py-3">{item.date}</td>
                          {<td className="px-4 py-3">

                            {item.status === "Owner" ? (
                              <OwnerButton />
                            ) : item.status === "Tenant" ? (
                              <TenantButton />
                            ) : (
                              <EmptyButton />
                            )}
                          </td>}

                          <td className="px-4 py-3">{item.phoneNumber}</td>
                          <td className="px-4 py-3 text-green-500 font-bold">
                            ₹{item.amount}
                          </td>
                          {<td className="px-4 py-3 text-center">
                            {item.penalty === "250" ? (
                              <PenalityButton />
                            ) : (
                              <EmptyButton />
                            )}
                          </td>}

                          {<td className="px-4 py-3">

                            {item.paymentStatus === "Pending" ? (
                              <PendingButton />
                            ) : <DoneButton />}
                          </td>}
                          {/* <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full ${
                                item.paymentMethod === "Online"
                                  ? <OnlineButton/>
                                  : <CashButton />
                              }`}
                            >
                              
                            </span>
                          </td> */}
                          {<td className="px-4 py-3">

                            {item.paymentMethod === "Online" ? (
                              <OnlineButton />
                            ) : <CashButton />}
                          </td>}
                          <td className="px-4 py-3 text-blue-500 cursor-pointer hover:text-blue-700">
                            <button
                              onClick={openViewPopup}
                              className="bg-gray-300 p-1 rounded-lg"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {isViewOpen && (
        <ViewPopup itemDetails={itemDetails} onClose={closeViewPopup} />
      )}
    </>
  );
}

export default FinancialManagement;
