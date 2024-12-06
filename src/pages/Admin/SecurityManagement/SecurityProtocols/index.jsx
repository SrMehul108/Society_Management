import React, { useEffect, useState } from "react";
import SecurityProtocols from "../../../../components/SecurityManagement/Protocols/SecurityProtocols";
import SecurityEdit from "../../../../components/SecurityManagement/Protocols/SecurityEdit";
import SecurityView from "../../../../components/SecurityManagement/Protocols/SecurityView";
import SecurityDelete from "../../../../components/SecurityManagement/Protocols/SecurityDelete";
import { Icons } from "../../../../constants";
import { GetProtocol } from "../../../../apis/api";

const SecurityManagement = () => {
  const [protocols, setProtocols] = useState();
  const [viewItem, setViewItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  //protocols popup

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  //Edit protocols popup
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editId, setEditId] = useState();

  const openEditModal = (item) => {
    setIsEditOpen(true);
    setEditingItem(item)
    setEditId(item._id)
  }
  const closeEditModal = () => {
    setEditingItem(null)
    setIsEditOpen(false)
  }

  //View protocols popup
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Sample data for the request

  const openViewModal = (item) => {
    setViewItem(item);
    setIsViewOpen(true);
  };
  const closeViewModal = () => {
    setViewItem(null);
    setIsViewOpen(false);
  };

  // delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = (id) => {
    setDeleteItemId(id);
    setIsDeleteOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteOpen(false);

  const FetchProtocols = async () => {
    try {
      const data = await GetProtocol();
      setProtocols(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchProtocols();
  }, []);

  const handleProtocolsAdded = () => {
    FetchProtocols();
    closeModal();
  };

  const handleProtocolUpdate=()=>{
    FetchProtocols()
    closeEditModal()
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
        {isOpen && (
          <SecurityProtocols
            onClose={closeModal}
            onAddProtocols={handleProtocolsAdded}
          />
        )}
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
            {protocols?.map((protocols, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
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
                  <span
                    className="px-4 py-1 rounded-full"
                    style={{ backgroundColor: "#f6f8fb" }}
                  >
                    {protocols.time}
                  </span>
                </td>

                <td className="p-3 text-sm flex gap-2">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={()=>openEditModal(protocols,protocols._id)}
                  >
                    {Icons.Pen}
                  </button>
                  {isEditOpen && <SecurityEdit closeModal={closeEditModal} isOpen={isEditOpen} itemToEdit={editingItem} protocolId={editingItem._id} onProtocolUpdated={handleProtocolUpdate} />}
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openViewModal(protocols)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  {isViewOpen && (
                    <SecurityView item={viewItem} closeModal={closeViewModal} />
                  )}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openDeleteModal(protocols._id)}
                  >
                    {Icons.Delete}
                  </button>
                  {isDeleteOpen && (
                    <SecurityDelete
                      closeModal={closeDeleteModal}
                      protocolId={deleteItemId}
                      fetchProtocols={FetchProtocols}
                    />
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
