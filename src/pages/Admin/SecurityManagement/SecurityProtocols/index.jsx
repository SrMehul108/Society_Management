import React, { useEffect, useState } from "react";
import SecurityProtocols from "../../../../components/SecurityManagement/Protocols/SecurityProtocols";
import SecurityEdit from "../../../../components/SecurityManagement/Protocols/SecurityEdit";
import SecurityView from "../../../../components/SecurityManagement/Protocols/SecurityView";
import SecurityDelete from "../../../../components/SecurityManagement/Protocols/SecurityDelete";
import { Icons } from "../../../../constants";
import { GetProtocol } from "../../../../apis/api";

const SecurityManagement = () => {
  const [protocols, setProtocols] = useState();

  //protocols popup

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  //Edit protocols popup
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  //View protocols popup
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Sample data for the request
  const requestData = {
    id: 2,
    title: "Esther Howard",
    description: "Regular waste collection services.",
    date: "11/10/2021 ",
    time: "8.45pm",
  };

  const openViewModal = () => setIsViewOpen(true);
  const closeViewModal = () => setIsViewOpen(false);

  // delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  const FetchProtocols=async()=>{
    try {
      const data=await GetProtocol()
      setProtocols(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    FetchProtocols()
  },[])

  const handleProtocolsAdded=()=>{
    FetchProtocols()
    closeModal()
  }

  return (
    <div className=" p-4 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4 rounded-md">
        <h1 className="text-xl font-bold">Security Protocols</h1>
        <button
          className="bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white py-2 px-4 rounded-xl"
          onClick={openModal}
        >
          Create Protocols
        </button>
        {isOpen && <SecurityProtocols onClose={closeModal} onAddProtocols={handleProtocolsAdded} />}
      </div>
      <div className="overflow-x-auto border rounded-t-2xl">
        <table className="min-w-full bg-white  shadow">
          <thead>
            <tr className="border-b" style={{ backgroundColor: "#eef1fd" }}>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">
                {" "}
                Title
              </th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">
                Description
              </th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">
                Date
              </th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">
                Time
              </th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {protocols?.map((protocols) => (
              <tr key={protocols.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-700 font-semibold">
                  {protocols.title}
                </td>
                <td className="p-3 text-sm text-gray-700 font-semibold">
                  {protocols.description}
                </td>
                <td className="p-3 text-sm text-gray-700 font-semibold">
                  {protocols.date}
                </td>
                <td className="p-3 text-sm text-gray-700 font-semibold">
                  <span className="px-4 py-1 rounded-full" style={{ backgroundColor: "#f6f8fb" }}>
                    {protocols.time}
                  </span>
                </td>

                <td className="p-3 text-sm flex gap-2">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={openEditModal}
                  >
                    {Icons.Pen}
                  </button>
                  {isEditOpen && <SecurityEdit closeModal={closeEditModal} />}
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={openViewModal}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  {isViewOpen && (
                    <SecurityView
                      data={requestData}
                      closeModal={closeViewModal}
                    />
                  )}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={openDeleteModal}
                  >
                    {Icons.Delete}
                  </button>
                  {isDeleteOpen && (
                    <SecurityDelete closeModal={closeDeleteModal} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecurityManagement;
