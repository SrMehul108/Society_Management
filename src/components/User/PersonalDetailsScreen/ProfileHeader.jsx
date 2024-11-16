

import React, { useState } from 'react';

const ProfileHeader = ({ owner, tenant }) => {
  const [activeTab, setActiveTab] = useState('Owner');
  const activeData = activeTab === 'Owner' ? owner : tenant;

  return (
    <div className="rounded-lg pb-5">
      {/* Tab Selector */}
      <div className="flex">
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ${
            activeTab === 'Owner' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('Owner')}
        >
          Owner
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ${
            activeTab === 'Tenant' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('Tenant')}
        >
          Tenant
        </button>
      </div>

      {/* Profile Information */}
      <div className="flex flex-col lg:flex-row lg:items-start p-4 bg-white shadow-lg rounded-lg space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col items-center lg:items-start mt-auto mb-auto">
          <div className="border w-28 h-28 rounded-full">
            <img src={activeData.image} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <div>
            <p className="text-gray-600 text-sm">Full Name</p>
            <p className="font-semibold">{activeData.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Phone Number</p>
            <p className="font-semibold">{activeData.phone}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Email Address</p>
            <p className="font-semibold">{activeData.email}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Gender</p>
            <p className="font-semibold">{activeData.gender}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Wing</p>
            <p className="font-semibold">{activeData.wing}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Age</p>
            <p className="font-semibold">{activeData.age}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Unit</p>
            <p className="font-semibold">{activeData.unit}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Relation</p>
            <p className="font-semibold">{activeData.relation}</p>
          </div>
        </div>

        {/* Document Attachments */}
        <div className="flex flex-col mt-4 lg:mt-0 lg:ml-8 space-y-2">
          {activeData.documents.map((doc, index) => (
            <div key={index} className="flex items-center p-2 border rounded-lg">
              <span className="text-blue-500 mr-2">&#128206;</span>
              <div>
                <p className="text-sm font-semibold">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.size} MB</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

