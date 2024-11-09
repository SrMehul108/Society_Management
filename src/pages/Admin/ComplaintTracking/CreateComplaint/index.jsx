

// ComplaintTable.js
import React, { useState } from 'react';
import ComplaintForm from '../../../../components/ComplaintTraking/ComplaintFormPopup';
import EditRequestForm from '../../../../components/ComplaintTraking/EditRequestForm';
import ViewRequestPopup from '../../../../components/ComplaintTraking/ViewRequestPopup';
import DeleteConfirmationPopup from '../../../../components/ComplaintTraking/DeleteRequestPopup';

export const CreactComplaint = () => {


  const [complaints, setComplaints] = useState([
    {
      id: 1,
      complainerName: "Evelyn Harper",
      complaintName: "Unethical Behavior",
      description: "Providing false information or deliberately.",
      unit: "A ",
      unitNumber: " 1001",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 2,
      complainerName: "Esther Howard",
      complaintName: "Preventive Measures",
      description: "Regular waste collection services.",
      unit: "B ",
      unitNumber: " 1002",
      priority: "Low",
      status: "Open",
    },
    // Add more complaint data as needed...
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Open':
        return 'bg-blue-100 text-blue-800';
      case 'Solve':
        return 'bg-green-100 text-green-800';
      default:
        return '';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-200 text-White-800';
      case 'Medium':
        return 'bg-blue-500 text-White-800';
      case 'Low':
        return 'bg-green-500  text-white-800';
      default:
        return '';
    }
  };

  //ComplaintForm popup

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  //Edit ComplaintForm popup
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);


//View ComplaintForm popup
const [isViewOpen, setIsViewOpen] = useState(false);

  // Sample data for the request
  const requestData = {
    name: 'Evelyn Harper',
    date: 'Aug 5, 2024',
    requestName: 'Unethical Behavior',
    description: 'Offering, giving, receiving, or soliciting of value to influence the actions of an.',
    wing: 'A',
    unit: '1002',
    priority: 'Medium',
    status: 'Open',
    avatarUrl: 'https://via.placeholder.com/50', // Placeholder avatar image
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
        <h1 className="text-xl font-bold">Create Complaint</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl" onClick={openModal}>
          Create Complaint
        </button>
        {isOpen && <ComplaintForm closeModal={closeModal} />}
      </div>
      <div className="overflow-x-auto border rounded-t-2xl">
        <table className="min-w-full bg-white  shadow">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Complainer Name</th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Complaint Name</th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Description</th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Unit Number</th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Priority</th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Status</th>
              <th className="p-3 text-left font-semibold text-sm text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-700">{complaint.complainerName}</td>
                <td className="p-3 text-sm text-gray-700">{complaint.complaintName}</td>
                <td className="p-3 text-sm text-gray-700">{complaint.description}</td>
                <td className="p-3 text-sm text-gray-700"><span className='text-green-600 font-bold'>{complaint.unit }</span>{complaint.unitNumber}</td>
                <td className="p-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                </td>
                <td className="p-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="p-3 text-sm flex gap-2">
                  <button className="text-green-500 hover:text-green-700"
                   onClick={openEditModal}>
                  <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  {isEditOpen && <EditRequestForm closeModal={closeEditModal} />}
                  <button className="text-blue-500 hover:text-blue-700"  onClick={openViewModal}>
                    <i className="fas fa-eye"></i>
                  </button>
                  {isViewOpen && <ViewRequestPopup data={requestData} closeModal={closeViewModal} />}
                  <button className="text-red-500 hover:text-red-700"  onClick={openDeleteModal}>
                    <i className="fas fa-trash"></i>
                  </button>
                  {isDeleteOpen && <DeleteConfirmationPopup closeModal={closeDeleteModal} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


