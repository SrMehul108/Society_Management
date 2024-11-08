import React, { useRef, useState } from 'react';

const facilities = [
  {
    id: 1,
    title: 'Parking Facilities',
    date: '01/07/2024',
    description:
      'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...',
  },
  {
    id: 2,
    title: 'Community Center',
    date: '01/07/2024',
    description:
      'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...',
  },
  {
    id: 3,
    title: 'Swimming Pool',
    date: '01/07/2024',
    description:
      'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...',
  },
  {
    id: 4,
    title: 'Parks and Green Spaces',
    date: '01/07/2024',
    description:
      'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...',
  },
  {
    id: 5,
    title: 'Wi-Fi and Connectivity',
    date: '01/07/2024',
    description:
      'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...',
  },
  {
    id: 6,
    title: 'Pet-Friendly Facilities',
    date: '01/07/2024',
    description:
      'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...',
  },
];

export const FacilityManagement = () => {
  const [menuVisible, setMenuVisible] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">Facility Management</h1>
        <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">
          Create Facility
        </button>
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {facilities.map((facility) => (
          <div
            key={facility.id}
            className="relative bg-white border rounded-lg shadow-md p-4 transition-transform hover:scale-105"
          >
            {/* Three Dots Icon and Dropdown Menu */}
            <div className="absolute top-6 right-5">
              <i
                className="fas fa-ellipsis-h text-gray-600 bg-white p-1 rounded-sm cursor-pointer"
                onClick={() => toggleMenu(facility.id)}
              ></i>
              {menuVisible === facility.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    View
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Edit
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-white bg-blue-500 rounded-t-lg px-3 py-2">
              {facility.title}
            </h2>

            {/* Content */}
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-500">
                Upcoming Schedule Service Date
                <span className="ml-2 text-black">{facility.date}</span>
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Description:</strong> {facility.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
