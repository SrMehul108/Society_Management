

import React, { useState } from 'react';
import Table from '../../../components/ComplaintTraking/Table';
import EditRequestForm from '../../../components/ComplaintTraking/EditRequestForm';
import ViewRequestPopup from '../../../components/ComplaintTraking/ViewRequestPopup';
import DeleteConfirmationPopup from '../../../components/ComplaintTraking/DeleteRequestPopup';
import { FaPlus, FaUser } from 'react-icons/fa';
import AddNumberPopup from '../../../components/Dashboard/AddNumberPopup/AddNumberPopup';
import DeletePopup from '../../../components/Dashboard/DeletePopup/DeletePopup';
import { HighButton, LowButton, MediumButton, OpenButton, PendingButton, SolveButton } from '../../../components/Button/Button';

export const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("Last month");
  const [ComplaintselectedMonth, setComplaintSelectedMonth] = useState("Last month");
  const [UpcomingselectedMonth, setUpcomingSelectedMonth] = useState("Last month");

  const balanceData = [
    { title: 'Total Balance', amount: '₹ 2,22,520', icon: '📘' },
    { title: 'Total Income', amount: '₹ 55,000', icon: '💰' },
    { title: 'Total Expense', amount: '₹ 20,550', icon: '💸' },
    { title: 'Total Unit', amount: '₹ 20,550', icon: '🏢' },
  ];

  const contacts = [
    { name: 'Hanna Donin', phone: '+91 99587 33657', work: 'Plumber' },
  ];

  const maintenances = [
    { name: 'Roger Lubin', status: '2 Month Pending', amount: '₹ 5,000' },
  ];

  const activities = [
    { event: 'Society Meeting', date: '24-09-2024', time: '8:00 PM to 10:00 PM' },
    { event: 'Holi Festival', date: '24-09-2024', time: '8:00 PM to 10:00 PM' },
  ];

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
      render: (value) =>
        value === 'High' ? (
          <HighButton />
        ) : value === 'Medium' ? (
          <MediumButton />
        ) : value === 'Low' ? (
          <LowButton />
        ) : (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-black">
            {value}
          </span>
        ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) =>  
        value === 'Pending' ? (
          <PendingButton />
        ) : value === 'Open' ? (
          <OpenButton />
        ) : value === 'Solve' ? (
          <SolveButton />
        ) : (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-black">
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

  const [complaintsTable, setcomplaintsTable] = useState([
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
    {
      id: 3,
      complainerName: 'Esther Howard',
      complaintName: 'Preventive Measures',
      description: 'Regular waste collection services.',
      unit: 'B',
      unitNumber: '1005',
      priority: 'High',
      status: 'Solve',
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState('add');
  const [editData, setEditData] = useState(null);

  const handleAddClick = () => {
    setPopupMode('add');
    setEditData(null);
    setIsPopupOpen(true);
  };

  const handleEditClick = () => {
    setPopupMode('edit');
    setEditData({
      fullName: 'John Doe',
      phoneNumber: '+1 555 555 5555',
      work: 'Engineer',
    });
    setIsPopupOpen(true);
  };
  const [isDeleteData, setIsDeleteData] = useState(false);
  const handleDeleteClick = () => {
    setIsDeleteData(true);
  }

  return (
    <div className="bg-gray-100 p-2 space-y-6">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {balanceData.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
            <div>
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <p className="text-xl font-bold">{item.amount}</p>
            </div>
            <div className="text-3xl">{item.icon}</div>
          </div>
        ))}
      </div>
      
      {/* Chart, Contacts, and Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Total Balance</h2>
            <select
              className="border border-gray-300 rounded-lg p-1"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option>Last week</option>
              <option>Last month</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="bg-gray-200 flex items-center justify-center rounded-lg h-64 lg:h-96">
            <p className="text-gray-500">Chart Placeholder</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contacts */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div className='flex justify-between items-center'>
              <h2 className="text-lg font-semibold">Important Numbers</h2>
              <button className="bg-orange-500 p-1 hover:bg-orange-600 text-white flex rounded-sm items-center"
                onClick={handleAddClick}>
                <FaPlus className="mr-2 text-white" />
                Add
              </button>
              {isPopupOpen && (
                <AddNumberPopup
                  mode={popupMode}
                  initialData={editData}
                  onClose={() => setIsPopupOpen(false)}
                />
              )}
            </div>
            <ul className="space-y-3 mt-3">
              {contacts.map((contact, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                    <p className="text-sm text-gray-500">{contact.work}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-red-500" onClick={handleDeleteClick}>🗑️</button>
                    {isDeleteData && <DeletePopup onClose={() => setIsDeleteData(false)} />}
                    <button className="text-green-500" onClick={handleEditClick}>✏️</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Maintenance */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div className='flex justify-between items-center'>
              <h2 className="text-lg font-semibold">Pending Maintenances</h2>
              <p><a href="#">View All</a></p>
            </div>
            <ul className="space-y-3 mt-3">
              {maintenances.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.status}</p>
                  </div>
                  <p className="text-red-500 font-semibold">{item.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Complaint List */}
        <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Complaint List</h2>
            <select
              className="border border-gray-300 rounded-lg p-1"
              value={ComplaintselectedMonth}
              onChange={(e) => setComplaintSelectedMonth(e.target.value)}
            >
              <option>Last week</option>
              <option>Last month</option>
              <option>Last year</option>
            </select>
          </div>
          <Table columns={columns} data={complaintsTable} actions={actions} />
          {isModalOpen.edit && <EditRequestForm data={selectedComplaint} closeModal={() => toggleModal('edit')} />}
          {isModalOpen.view && <ViewRequestPopup data={selectedComplaint} closeModal={() => toggleModal('view')} />}
          {isModalOpen.delete && <DeleteConfirmationPopup data={selectedComplaint} closeModal={() => toggleModal('delete')} />}
        </div>

        {/* Upcoming Activities */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming Activity</h2>
            <select
              className="border border-gray-300 rounded-lg p-1"
              value={UpcomingselectedMonth}
              onChange={(e) => setUpcomingSelectedMonth(e.target.value)}
            >
              <option>Last week</option>
              <option>Last month</option>
              <option>Last year</option>
            </select>
          </div>
          <ul className="space-y-3">
            {activities.map((activity, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{activity.event}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <p className="text-gray-500">{activity.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};