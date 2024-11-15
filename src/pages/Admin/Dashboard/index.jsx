// import React from 'react'
// import { BarChart3, LayoutDashboard, DollarSign, FileText, Bell, ShieldCheck, Banknote , LogOut } from 'lucide-react'


// export const Dashboard = () => {
//   return (
//     <>
//         {/* Dashboard Content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
//                     <p className="text-2xl font-bold">₹ 2,22,520</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-2">Total Income</h3>
//                     <p className="text-2xl font-bold">₹ 55,000</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-2">Total Expense</h3>
//                     <p className="text-2xl font-bold">₹ 20,550</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-2">Total Unit</h3>
//                     <p className="text-2xl font-bold">₹ 20,550</p>
//                 </div>
//             </div>

//             {/* Chart and Important Numbers */}
//             <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
//                 <div className=" bg-white p-5 rounded-lg shadow ">
//                     <h3 className="text-lg font-semibold mb-4">Total Balance</h3>
//                     <div className="h-64 flex items-center justify-center">
//                         <BarChart3 className="w-full h-full text-blue-500" />
//                     </div>
//                 </div>
//                 <div className="bg-white p-4  rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-4">Important Numbers</h3> <span><button type='button' className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-700">Add</button></span>

//                     {/* Add your important numbers content here */}
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-4">Pending Maintenance</h3>
//                     {/* Add your important numbers content here */}
//                 </div>
//             </div>

//             {/* Complaint List */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//                 <div className="bg-white p-4 rounded-lg shadow mb-8">
//                     <h3 className="text-lg font-semibold mb-4">Complaint List</h3>
//                     <table className="min-w-full">
//                         <thead>
//                             <tr>
//                                 <th className="text-left">Complainer Name</th>
//                                 <th className="text-left">Complaint Name</th>
//                                 <th className="text-left">Date</th>
//                                 <th className="text-left">Priority</th>
//                                 <th className="text-left">Complaint Status</th>
//                                 <th className="text-left">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* Add your complaint list items here */}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-4">Upcoming Activity</h3>
//                     {/* Add your upcoming activity content here */}
//                 </div>
//             </div>
//         </main>
//     </>
// )
// }



import React, { useState } from 'react';
import Table from '../../../components/ComplaintTraking/Table';
import EditRequestForm from '../../../components/ComplaintTraking/EditRequestForm';
import ViewRequestPopup from '../../../components/ComplaintTraking/ViewRequestPopup';
import DeleteConfirmationPopup from '../../../components/ComplaintTraking/DeleteRequestPopup';
import { FaPlus, FaUser } from 'react-icons/fa';
import AddNumberPopup from '../../../components/Dashboard/AddNumberPopup/AddNumberPopup';
import DeletePopup from '../../../components/Dashboard/DeletePopup/DeletePopup';

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

  // Complaint Table
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
          className={`px-2 py-1 rounded-full text-xs font-semibold ${value === 'High'
            ? 'bg-red-200 text-white'
            : value === 'Medium'
              ? 'bg-blue-500 text-white'
              : 'bg-green-500 text-white'
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
          className={`px-2 py-1 rounded-full text-xs font-semibold ${value === 'Pending'
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
  ]);

  //Add or edit  NUmber Popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState('add'); // 'add' or 'edit'
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
  const handleDeleteClick = () =>{
    setIsDeleteData(true);
  }

  return (
    <div className=" bg-gray-100 p-2 space-y-6">
      {/* Dashboard Cards */}
      <div className="flex flex-wrap gap-4">
        {balanceData.map((item, index) => (
          <div key={index} className="flex flex-1  items-center justify-between bg-white rounded-lg shadow-md p-4">
            <div>
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <p className="text-xl font-bold">{item.amount}</p>
            </div>
            <div className="text-3xl">{item.icon}</div>
          </div>
        ))}
      </div>
      {/* Contacts and Maintenance */}
      <div className="flex flex-wrap gap-4">
        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col w-1/2 h-96">
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
          <div className=" bg-gray-200 flex items-center justify-center rounded-lg h-96">
            <p className="text-gray-500">Chart Placeholder</p>
          </div>
        </div>
        {/* Contacts */}
        <div className="flex-1   bg-white rounded-lg shadow-md p-4 flex flex-col">
          <div className='flex justify-between items-center'>
            <h2 className="text-lg font-semibold">Important Numbers</h2>
            <button className="bg-orange-500 p-1 hover:bg-orange-600 text-white flex  rounded-sm items-center"
              onClick={handleAddClick}>
              <FaPlus className="mr-2 text-white" /> {/* Icon - Optional */}
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
                  {isDeleteData && <DeletePopup  onClose={() => setIsDeleteData(false)} />}
                 
                  <button className="text-green-500"
                    onClick={handleEditClick}>✏️</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Maintenance */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-4 flex flex-col">
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

      <div className="flex flex-wrap gap-4">
        {/* Complaint List */}
        <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold ">Complaint List</h2>
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
        <div className="bg-white rounded-lg shadow-md p-4   flex-1  flex-wrap gap-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className=" text-lg font-semibold">Upcoming Activity</h2>
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


