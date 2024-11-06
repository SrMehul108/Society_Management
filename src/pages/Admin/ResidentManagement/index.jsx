import React from "react";
import { ViewOwner } from "../../../components/Resident_management/ViewOwner";

export const ResidentManagement = () => {
    const residents = [
        {
            id: 1,
            name: 'Evelyn Harper',
            wing: 'A',
            unitNumber: '1001',
            unitStatus: 'Occupied',
            residentStatus: 'Owner',
            phoneNumber: '97587 85828',
            members: 1,
            vehicles: 2,
        },
        {
            id: 2,
            name: '-',
            wing: 'B',
            unitNumber: '1002',
            unitStatus: 'Occupied',
            residentStatus: 'TenantF',
            phoneNumber: '--',
            members: '-',
            vehicles: '-',
        },
        // Add more entries as needed...
    ];

    const handleView = () => {
        console.log("Viewing details");
        <ViewOwner />;
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-semibold">Resident Tenant and Owner Details</h1>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-sm md:text-base">
                    <i className="fas fa-plus mr-2"></i> Add New Resident Details
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                {/* Desktop Table View */}
                <table className="min-w-full hidden md:table bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Full Name</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Unit Number</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Unit Status</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Resident Status</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Phone Number</th>
                            <th className="py-2 px-4 border-b text-center text-gray-600 font-semibold">Member</th>
                            <th className="py-2 px-4 border-b text-center text-gray-600 font-semibold">Vehicle</th>
                            <th className="py-2 px-4 border-b text-center text-gray-600 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((resident, index) => (
                            <tr key={index} className="text-gray-700">
                                <td className="py-3 px-4 border-b flex items-center space-x-3">
                                    <img
                                        src={resident.name === '-' ? 'https://via.placeholder.com/40' : 'https://via.placeholder.com/40'}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span>{resident.name}</span>
                                </td>
                                <td className="py-3 px-4 border-b text-blue-500">{resident.wing}{resident.unitNumber}</td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        className={`px-2 py-1 rounded-full text-white ${
                                            resident.unitStatus === 'Occupied' ? 'bg-pink-200 text-pink-800' : 'bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        {resident.unitStatus}
                                    </button>
                                </td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        className={`px-2 py-1 rounded-full text-white ${
                                            resident.residentStatus === 'Tenant' ? 'bg-pink-200 text-pink-800' : 'bg-indigo-200 text-indigo-800'
                                        }`}
                                    >
                                        {resident.residentStatus}
                                    </button>
                                </td>
                                <td className="py-3 px-4 border-b">{resident.phoneNumber}</td>
                                <td className="py-3 px-4 border-b text-center">{resident.members}</td>
                                <td className="py-3 px-4 border-b text-center">{resident.vehicles}</td>
                                <td className="py-3 px-4 border-b text-center">
                                    <button className="bg-green-500 text-white p-2 text-xs rounded-lg hover:bg-green-600 mr-2">
                                        <i className="fas fa-edit"></i>
                                    </button>
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
                        <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4 text-gray-700">
                            <div className="flex items-center mb-2">
                                <img
                                    src={resident.name === '-' ? 'https://via.placeholder.com/40' : 'https://via.placeholder.com/40'}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <h3 className="font-semibold">{resident.name}</h3>
                                    <p className="text-sm text-gray-500">{resident.phoneNumber}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div><span className="font-semibold">Wing:</span> {resident.wing}</div>
                                <div><span className="font-semibold">Unit:</span> {resident.unitNumber}</div>
                                <div>
                                    <span className="font-semibold">Status:</span>
                                    <span
                                        className={`ml-1 px-2 py-1 rounded-full text-white text-xs ${
                                            resident.unitStatus === 'Occupied' ? 'bg-teal-200 text-teal-800' : 'bg-purple-200 text-purple-800'
                                        }`}
                                    >
                                        {resident.unitStatus}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">Resident:</span>
                                    <span
                                        className={`ml-1 px-2 py-1 rounded-full text-white text-xs ${
                                            resident.residentStatus === 'Tenant' ? 'bg-pink-200 text-pink-800' : 'bg-indigo-200 text-indigo-800'
                                        }`}
                                    >
                                        {resident.residentStatus}
                                    </span>
                                </div>
                                <div><span className="font-semibold">Members:</span> {resident.members}</div>
                                <div><span className="font-semibold">Vehicles:</span> {resident.vehicles}</div>
                            </div>
                            <div className="mt-3 flex justify-end space-x-2">
                                <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600" onClick={handleView}>
                                    <i className="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
