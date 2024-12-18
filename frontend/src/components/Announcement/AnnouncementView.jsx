import React from 'react';

function AnnouncementView({ data, closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <div className="flex justify-between items-start mb-4 ">
          <h2 className="text-xl font-semibold">Announcement Details</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700  text-xl ">&times;</button>
        </div>

        <hr className='mb-4' />

        <div className='mb-4'>
        <p className="text-sm font-medium text-gray-700">Announcement Type </p>
        <p className="text-base">{data.type}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Title</p>
          <p className="text-base">{data.title}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Description</p>
          <p className="text-base">{data.description}</p>
        </div>

        <div className="grid grid-cols-4 gap-2 ">
          <div>
            <p className="text-sm font-medium text-gray-700">Date</p>
            <p className="text-base font-medium">{data.date}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Time</p>
            <p className="text-base font-medium text-black-600">{data.time}</p>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default AnnouncementView;
