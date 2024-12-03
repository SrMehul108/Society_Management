import React, { useState, useEffect } from "react";
import axios from "axios";
import { ViewOwner } from "../../../components/Resident_management/ViewOwner";
import {
  EmptyButton,
  OccupiedButton,
  OwnerButton,
  TenantButton,
  VacateButton,
} from "../../../components/Button/Button";
import { Statuspopup } from "../../../components/Resident_management/Status_popup";
import { getUser } from "../../../apis/api";
import EditStatusModal from "../../../components/Resident_management/EditStatus_modal";


export const ResidentManagement = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true); // for loading state
  const [error, setError] = useState(null); // for error handling

  useEffect(() => {
    // Fetch user data on component mount
    const fetchResidents = async () => {
      try {
        const data = await getUser();
        setResidents(data); // Set the fetched data to residents state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Failed to load resident data.");
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  const handleView = () => {
    console.log("Viewing details");
    <ViewOwner />;
  };

  // Status popup logic
  const [isPopupStatus, setIsPopupStatus] = useState(false);
  const statusPopup = () => setIsPopupStatus(true);
  const StatusclosePopup = () => setIsPopupStatus(false);

  if (loading) {
    return <div>Loading...</div>; // Show loading text until data is fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if data fails to load
  }

  // edit status popup logic
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const openEditStatusModal = () => setIsEditStatusModalOpen(true);
  const closeEditStatusModal = () => setIsEditStatusModalOpen(false);


  return (
    <>
      <div className="p-4 md:p-8 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold">
            Resident Tenant and Owner Details
          </h1>
          <button
            className=" text-white px-4 py-2 rounded-md  text-sm md:text-base bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500"
            onClick={statusPopup}
          >
            <i className="fas fa-plus mr-2"></i> Add New Resident Details
          </button>
          {isPopupStatus && <Statuspopup onClose={StatusclosePopup} />}
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {/* Desktop Table View */}
          <table className="min-w-full hidden md:table bg-white">
            <thead className="bg-royalgray">
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                  Full Name
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                  Unit Number
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                  Unit Status
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                  Resident Status
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                  Phone Number
                </th>
                <th className="py-2 px-4 border-b text-center text-gray-600 font-semibold">
                  Member
                </th>
                <th className="py-2 px-4 border-b text-center text-gray-600 font-semibold">
                  Vehicle
                </th>
                <th className="py-2 px-4 border-b text-center text-gray-600 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-3 px-4 border-b flex items-center space-x-3">
                    <img
                      src={
                        resident.profile_image ? resident.profile_image : "img"
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{resident.fullName}</span>
                  </td>
                  <td className="py-3 px-4 border-b ">
                    <div className="flex gap-4">
                      <div className="rounded-full bg-slate-300 flex justify-center h-6 w-6 text-blue-500">
                        {resident.metaData.wing}
                      </div>
                      <div>{resident.metaData.unit}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4 border-b">
                    {resident.isActive ? <OccupiedButton /> : <VacateButton />}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {resident.metaData.type === "owner" ? (
                      <OwnerButton />
                    ) : resident.metaData.type === "tenant" ? (
                      <TenantButton />
                    ) : (
                      <EmptyButton />
                    )}
                  </td>
                  <td className="py-3 px-4 border-b">{resident.phoneNo}</td>
                  <td className="py-3 px-4 border-b text-center">
                    {resident.members}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {resident.vehicles}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button className="bg-green-500 text-white p-2 text-xs rounded-lg hover:bg-green-600 mr-2"
                    onClick={openEditStatusModal}>
                      <i className="fas fa-edit"></i>
                    </button>
                    {isEditStatusModalOpen && <EditStatusModal onClose={closeEditStatusModal} />}
                    <button
                      className="bg-blue-500 text-white p-2 rounded-lg text-xs hover:bg-blue-600"
                      onClick={handleView}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {residents.map((resident, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg mb-4 p-4 text-gray-700"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={
                      resident.name === "-"
                        ? "https://via.placeholder.com/40"
                        : "https://via.placeholder.com/40"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{resident.name}</h3>
                    <p className="text-sm text-gray-500">
                      {resident.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-semibold">Wing:</span> {resident.wing}
                  </div>
                  <div>
                    <span className="font-semibold">Unit:</span>{" "}
                    {resident.unitNumber}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`ml-1 px-2 py-1 rounded-full text-white text-xs ${
                        resident.unitStatus === "Occupied"
                          ? "bg-teal-200 text-teal-800"
                          : "bg-purple-200 text-purple-800"
                      }`}
                    >
                      {resident.unitStatus}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Resident:</span>
                    <span
                      className={`ml-1 px-2 py-1 rounded-full text-white text-xs ${
                        resident.residentStatus === "Tenant"
                          ? "bg-pink-200 text-pink-800"
                          : "bg-indigo-200 text-indigo-800"
                      }`}
                    >
                      {resident.residentStatus}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Members:</span>{" "}
                    {resident.members}
                  </div>
                  <div>
                    <span className="font-semibold">Vehicles:</span>{" "}
                    {resident.vehicles}
                  </div>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                    onClick={handleView}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
