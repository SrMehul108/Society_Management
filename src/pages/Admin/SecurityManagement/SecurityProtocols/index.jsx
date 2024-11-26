



// ComplaintTable.js
import React, { useState } from 'react';
import SecurityProtocols from '../../../../components/SecurityManagement/Protocols/SecurityProtocols';
import SecurityEdit from '../../../../components/SecurityManagement/Protocols/SecurityEdit';
import SecurityView from '../../../../components/SecurityManagement/Protocols/SecurityView';
import SecurityDelete from '../../../../components/SecurityManagement/Protocols/SecurityDelete';


 const SecurityManagement = () => {


  const [protocols, setProtocols] = useState([
    {
      id: 1,
     title: "Evelyn Harper",
      description: "Providing false information or deliberately.",
      date: "11/11/2021 ",
      time:"3.45pm",
     
    },
    {
      id: 2,
      title: "Esther Howard",
      description: "Regular waste collection services.",
      date: "11/10/2021 ",
      time:"8.45pm",
      
    },
    // Add more complaint data as needed...
  ]);



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
    time:"8.45pm",
  };

  const openViewModal = () => setIsViewOpen(true);
  const closeViewModal = () => setIsViewOpen(false);

  // delete 
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);


  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-4 rounded-md">
        <h1 className="text-xl font-bold">Security Protocols</h1>
        <button className="bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white py-2 px-4 rounded-xl" onClick={openModal}>
          Create Protocols
        </button>
        {isOpen && <SecurityProtocols closeModal={closeModal} />}
      </div>
      <div className="overflow-x-auto border rounded-t-2xl">
        <table className="min-w-full bg-white  shadow">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left font-semibold text-sm text-gray-600"> Title</th>
               <th className="p-3 text-left font-semibold text-sm text-gray-600">Description</th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Date</th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Time</th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((protocols) => (
              <tr key={protocols.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-700">{protocols.title}</td>
                <td className="p-3 text-sm text-gray-700">{protocols.description}</td>
                <td className="p-3 text-sm text-gray-700">{protocols.date}</td>
                <td className="p-3 text-sm text-gray-700">{protocols.time}</td>
               
                
                
                <td className="p-3 text-sm flex gap-2">
                  <button className="text-green-500 hover:text-green-700"
                   onClick={openEditModal}>
                  <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  {isEditOpen && <SecurityEdit closeModal={closeEditModal} />}
                  <button className="text-blue-500 hover:text-blue-700"  onClick={openViewModal}>
                    <i className="fas fa-eye"></i>
                  </button>
                  {isViewOpen && <SecurityView data={requestData} closeModal={closeViewModal} />}
                  <button className="text-red-500 hover:text-red-700"  onClick={openDeleteModal}>
                    <i className="fas fa-trash"></i>
                  </button>
                  {isDeleteOpen && <SecurityDelete closeModal={closeDeleteModal} />}
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