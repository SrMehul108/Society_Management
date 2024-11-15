import React from 'react'
import { BarChart3, LayoutDashboard, DollarSign, FileText, Bell, ShieldCheck, Banknote , LogOut } from 'lucide-react'


export const Dashboard = () => {
  return (
    <>
        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
                    <p className="text-2xl font-bold">₹ 2,22,520</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Income</h3>
                    <p className="text-2xl font-bold">₹ 55,000</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Expense</h3>
                    <p className="text-2xl font-bold">₹ 20,550</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Unit</h3>
                    <p className="text-2xl font-bold">₹ 20,550</p>
                </div>
            </div>

            {/* Chart and Important Numbers */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                <div className=" bg-white p-5 rounded-lg shadow ">
                    <h3 className="text-lg font-semibold mb-4">Total Balance</h3>
                    <div className="h-64 flex items-center justify-center">
                        <BarChart3 className="w-full h-full text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-4  rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Important Numbers</h3> <span><button type='button' className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-700">Add</button></span>

                    {/* Add your important numbers content here */}
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Pending Maintenance</h3>
                    {/* Add your important numbers content here */}
                </div>
            </div>

            {/* Complaint List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-4 rounded-lg shadow mb-8">
                    <h3 className="text-lg font-semibold mb-4">Complaint List</h3>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="text-left">Complainer Name</th>
                                <th className="text-left">Complaint Name</th>
                                <th className="text-left">Date</th>
                                <th className="text-left">Priority</th>
                                <th className="text-left">Complaint Status</th>
                                <th className="text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add your complaint list items here */}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Upcoming Activity</h3>
                    {/* Add your upcoming activity content here */}
                </div>
            </div>
        </main>
    </>
)
}



