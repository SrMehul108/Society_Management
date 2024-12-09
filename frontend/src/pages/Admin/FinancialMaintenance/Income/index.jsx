import React, { useEffect, useState } from "react";
import { Modal } from "../../../../components/Financial/SetManitenance";
import OtherIncome from "../../../../components/Financial/OtherIncome";
import ViewPopup from "../../../../components/Financial/ViewPopup";
import {
  CashButton,
  DoneButton,
  EmptyButton,
  OnlineButton,
  OwnerButton,
  PenalityButton,
  PendingButton,
  TenantButton,
} from "../../../../components/Button/Button";
import { getMaintenance, viewmaintenance } from "../../../../apis/api";

function FinancialManagement() {
  // State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOtherIncome, setShowOtherIncome] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [maintenanceAmount, setMaintenanceAmount] = useState(0);
  const [penaltyAmount, setPenaltyAmount] = useState(0);

  // Modal Handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Tab Handlers
  const handleMaintenanceClick = () => setShowOtherIncome(false);
  const handleOtherIncomeClick = () => setShowOtherIncome(true);

  // View Popup Handlers
  const openViewPopup = (item) => {
    setItemDetails(item);
    setIsViewOpen(true);
  };
  // const getdata = async () => {
  //   const item = await viewmaintenance();
  //   setItemDetails(item);
  // };
  // getdata()
  const closeViewPopup = () => setIsViewOpen(false);

  console.log("itme",itemDetails)

  // Fetch Maintenance Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMaintenance();
        setMaintenanceData(data);
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      }
    };
    fetchData();
  }, []);
  
  console.log("Maintenance",maintenanceData)
  

  return (
    <div className=" bg-gray-100">
      {/* Header Section */}
      {!showOtherIncome && (
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex">
            <div className="flex items-center justify-center w-1/2 md:w-auto p-4 m-2 bg-white border-l-4 border-green-500 rounded-lg shadow-sm">
              <div>
                <p className="text-sm text-black font-semibold">Maintenance Amount</p>
                <p className="text-lg font-bold text-green-500">
                  ₹ {maintenanceAmount}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-1/2 md:w-auto p-4 m-2 bg-white border-l-4 border-red-500 rounded-lg shadow-sm">
              <div>
                <p className="text-sm text-black font-semibold w-36">Penalty Amount</p>
                <p className="text-lg font-bold text-red-500">
                  ₹ {penaltyAmount}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className=" md:w-auto mt-4 md:mt-0 px-6 py-2  text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 transition"
          >
            Set Maintenance
          </button>

          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      )}

      {/* Tabs Section */}
      <div role="tablist" className="mt-4 tabs tabs-lifted tabs-lg rounded-lg">
        <div className="w-72 flex">
          <a
            role="tab"
            onClick={handleMaintenanceClick}
            className={`py-2 px-4 tab rounded-t border-b-2 ${
              !showOtherIncome
                ? "bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white border-b-orange-500"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            Maintenance
          </a>
          <a
            role="tab"
            onClick={handleOtherIncomeClick}
            className={`py-2 px-4 tab rounded-t border-b-2 ${
              showOtherIncome
                ? "bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white border-b-orange-500"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            Other Income
          </a>
        </div>

        {/* Content Section */}
        {showOtherIncome ? (
          <OtherIncome />
        ) : (
          <div
            className="bg-white p-4 overflow-hidden"
            style={{ height: "680px" }}
          >
            <h2 className="text-xl font-bold text-black mb-4">
              Maintenance Details
            </h2>
            <div
              className="overflow-x-auto rounded-lg h-full"
              style={{ maxHeight: "600px" }}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-royalgray sticky top-0">
                  <tr>
                    {[
                      "Name",
                      "Unit Number",
                      "Date",
                      "Status",
                      "Phone Number",
                      "Amount",
                      "Penalty",
                      "Payment Status",
                      "Payment Method",
                      "Action",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 text-left text-black font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200  overflow-y-auto custom-scrollbar">
                  {maintenanceData?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center space-x-2">
                        <img
                          src={item.profile_image}
                          alt="Profile"
                          className="rounded-full w-8 h-8"
                        />
                        <span className="text-gray-700 font-medium">
                          {item.fullName}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-600 px-2 p-1 rounded-full">
                          {item.metaData.wing}
                        </span>
                        <span className="text-black px-2 py-1">
                          {item.metaData.unit}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.createdDate}</td>
                      <td className="px-4 py-3">
                        {item.metaData.type === "owner" ? (
                          <OwnerButton />
                        ) : item.type === "tenant" ? (
                          <TenantButton />
                        ) : (
                          <EmptyButton />
                        )}
                      </td>
                      <td className="px-4 py-3">{item.phoneNo}</td>
                      <td className="px-4 py-3 text-green-500 font-bold">
                        ₹{" "}
                        {item.payments?.amount ? item.payments.amount : "----"}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {item.payments.penalty ? (
                          <PenalityButton />
                        ) : (
                          <EmptyButton />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {item.payments.paymentStatus === false ? (
                          <PendingButton />
                        ) : (
                          <DoneButton />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {item.payments.paymentType === "online" ? (
                          <OnlineButton />
                        ) : (
                          <CashButton />
                        )}
                      </td>
                      <td className="px-4 py-3 text-blue-500 cursor-pointer hover:text-blue-700">
                        <button
                          onClick={()=>openViewPopup(item)}
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
        )}
      </div>

      {isViewOpen && (
        <ViewPopup itemDetails={itemDetails} onClose={closeViewPopup} />
      )}
    </div>
  );
}

export default FinancialManagement;
