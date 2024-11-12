import React from 'react';

const AnnouncementsSection = ({ announcements }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-lg font-semibold mb-4">Announcement Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {announcements.map((announcement, index) => (
        // <div key={index} className="bg-blue-200 p-4 rounded-lg">
        //   <p>Date: {announcement.date}</p>
        //   <p>Time: {announcement.time}</p>
        //   <p>{announcement.description}</p>
        // </div>

        <div key={index} className="border  rounded-lg">
        <div className='p-2 bg-blue-600 rounded-t-lg'>
            <h4 className="font-semibold text-white ">{announcement.name}</h4>

        </div>
        <div className='p-2 '>
            <div className='flex'>
                <div className='w-1/3'><p>announcement Date </p></div>
                <div className='text-end w-2/3 font-semibold'>{announcement.date}</div>
            </div>
            <div className='flex'>
                <div className='w-1/3'><p>announcement Time  </p></div>
                <div className='text-end w-2/3 font-semibold'>{announcement.time}</div>
            </div>
            <div className=''>
                <div className='w-full'><p>Description </p></div>
                <div className='W-full font-semibold'>{announcement.description}</div>
            </div>
           
        </div>
    </div>
      ))}
    </div>
  </div>
);

export default AnnouncementsSection;
