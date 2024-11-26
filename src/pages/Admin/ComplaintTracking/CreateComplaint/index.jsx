
import React, { useState } from 'react';

import ComplaintForm from '../../../../components/ComplaintTraking/ComplaintFormPopup';
import EditRequestForm from '../../../../components/ComplaintTraking/EditRequestForm';
import ViewRequestPopup from '../../../../components/ComplaintTraking/ViewRequestPopup';
import DeleteConfirmationPopup from '../../../../components/ComplaintTraking/DeleteRequestPopup';
import Table from '../../../../components/ComplaintTraking/Table';

export const CreactComplaint = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      complainerName: 'Evelyn Harper',
      complaintName: 'Unethical Behavior',
      description: 'Providing false information or deliberately.',
      unit: 'A',
      unitNumber: '1001',
      priority: 'Medium',
      status: 'Pending',
    },
    {
      id: 2,
      complainerName: 'Esther Howard',
      complaintName: 'Preventive Measures',
      description: 'Regular waste collection services.',
      unit: 'B',
      unitNumber: '1002',
      priority: 'Low',
      status: 'Open',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState({
    create: false,
    edit: false,
    view: false,
    delete: false,
  });

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const toggleModal = (type, complaint = null) => {
    setSelectedComplaint(complaint);
    setIsModalOpen((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const columns = [
    { header: 'Complainer Name', accessor: 'complainerName' },
    { header: 'Complaint Name', accessor: 'complaintName' },
    { header: 'Description', accessor: 'description' },
    {
      header: 'Unit Number',
      accessor: 'unit',
      render: (value, row) => (
        <span>
          <span className="text-green-600 font-bold">{value}</span> {row.unitNumber}
        </span>
      ),
    },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            value === 'High'
              ? 'bg-red-200 text-white'
              : value === 'Medium'
              ? 'bg-blue-500 text-white '
              : 'bg-green-500 text-white px-6'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            value === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : value === 'Open'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const actions = [
    {
      className: 'text-green-500 hover:text-green-700',
      icon: <i className="fa-regular fa-pen-to-square"></i>,
      onClick: (row) => toggleModal('edit', row),
    },
    {
      className: 'text-blue-500 hover:text-blue-700',
      icon: <i className="fas fa-eye"></i>,
      onClick: (row) => toggleModal('view', row),
    },
    {
      className: 'text-red-500 hover:text-red-700',
      icon: <i className="fas fa-trash"></i>,
      onClick: (row) => toggleModal('delete', row),
    },
  ];

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-4 rounded-md">
        <h1 className="text-xl font-bold">Complaints</h1>
        <button
          className="bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white py-2 px-4 rounded-xl"
          onClick={() => toggleModal('create')}
        >
          Create Complaint
        </button>
        {isModalOpen.create && <ComplaintForm closeModal={() => toggleModal('create')} />}
      </div>

      <Table columns={columns} data={complaints} actions={actions} />

      {isModalOpen.edit && <EditRequestForm data={selectedComplaint} closeModal={() => toggleModal('edit')} />}
      {isModalOpen.view && <ViewRequestPopup data={selectedComplaint} closeModal={() => toggleModal('view')} />}
      {isModalOpen.delete && <DeleteConfirmationPopup data={selectedComplaint} closeModal={() => toggleModal('delete')} />}
    </div>
  );
};
