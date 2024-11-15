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

export const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("Last month");

  const balanceData = [
    { title: 'Total Balance', amount: '₹ 2,22,520', icon: '📘' },
    { title: 'Total Income', amount: '₹ 55,000', icon: '💰' },
    { title: 'Total Expense', amount: '₹ 20,550', icon: '💸' },
    { title: 'Total Unit', amount: '₹ 20,550', icon: '🏢' },
  ];

  const contacts = [
    { name: 'Hanna Donin', phone: '+91 99587 33657', work: 'Plumber' },
  ];

  const complaints = [
    { name: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'Medium', status: 'Open' },
    { name: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'Low', status: 'Pending' },
    { name: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'High', status: 'Solved' },
  ];

  const maintenances = [
    { name: 'Roger Lubin', status: '2 Month Pending', amount: '₹ 5,000' },
  ];

  const activities = [
    { event: 'Society Meeting', date: '24-09-2024', time: '8:00 PM to 10:00 PM' },
    { event: 'Holi Festival', date: '24-09-2024', time: '8:00 PM to 10:00 PM' },
  ];

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
              className="border border-gray-300 rounded p-1"
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
          <h2 className="text-lg font-semibold">Important Numbers</h2>
          <ul className="space-y-3 mt-3">
            {contacts.map((contact, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                  <p className="text-sm text-gray-500">{contact.work}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-green-500">✏️</button>
                  <button className="text-red-500">🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Maintenance */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-4 flex flex-col">
          <h2 className="text-lg font-semibold">Pending Maintenances</h2>
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
          <h2 className="text-lg font-semibold mb-4">Complaint List</h2>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Complainer Name</th>
                <th className="p-4 text-left">Complaint Name</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Priority</th>
                <th className="p-4 text-left">Complain Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.complaint}</td>
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${item.priority === 'High' ? 'bg-red-100 text-red-600' :
                      item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                      }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4">{item.status}</td>
                  <td className="p-4">
                    <button className="text-blue-500">🔍</button>
                    <button className="text-green-500">✏️</button>
                    <button className="text-red-500">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming Activities */}
        <div className="bg-white rounded-lg shadow-md p-4   flex-1  flex-wrap gap-4">
          <h2 className=" pb-4 ">Upcoming Activity</h2>
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


