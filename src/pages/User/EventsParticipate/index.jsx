import React, { useState } from 'react';

const data = {
  events: [
    { img: '', name: 'Cody Fisher', description: 'Event and recreational activities.', time: '2:45 PM', date: '11/02/2024', eventName: 'Holi Festival' },
    { name: 'Esther Howard', description: 'Securing critical government systems.', time: '1:45 AM', date: '12/02/2024', eventName: 'Ganesh Chaturthi' },
    // Add more events as needed
  ],
  activities: [
    { name: 'Robert Fox', description: 'Security training activities.', time: '2:00 PM', date: '13/02/2024', activityName: 'Team Building' },
    { name: 'Jenny Wilson', description: 'Outdoor exercises.', time: '4:00 AM', date: '14/02/2024', activityName: 'Outdoor Bootcamp' },
    // Add more activities as needed
  ]
};

const ParticipationTabs = () => {
  const [activeTab, setActiveTab] = useState('events');

  const renderTableContent = () => {
    const content = activeTab === 'events' ? data.events : data.activities;
    return content.map((item, index) => (
      <tr key={index} className="border-b border-gray-200">
        <td className="px-4 py-3 flex ">
          <div className='pr-3  items-center justify-center flex'>
            <img src= {item.img} alt='' className='border w-10 h-10  rounded-full' />
          </div>
          <div>
            {item.name}
          </div>

        </td>

        <td className="px-4 py-2">{item.description}</td>
        <td className="px-4 py-2">{item.time}</td>
        <td className="px-4 py-2">{item.date}</td>
        <td className="px-4 py-2">{activeTab === 'events' ? item.eventName : item.activityName}</td>
      </tr>
    ));
  };

  return (
    <div className="">
      <div className="flex border-b border-gray-200 ">
        <button
          className={`px-4 py-2  rounded-t-lg ${activeTab === 'events' ? 'text-white bg-orange-500' : 'text-gray-600'
            }`}
          onClick={() => setActiveTab('events')}
        >
          Events Participate
        </button>
        <button
          className={`px-4 py-2  rounded-t-lg ${activeTab === 'activities' ? 'text-white bg-orange-500' : 'text-gray-600'
            }`}
          onClick={() => setActiveTab('activities')}
        >
          Activity Participate
        </button>
      </div>

      <div className=" border bg-white p-3">
        <h2 className="text-sm font-bold mb-2">{activeTab === 'events' ? 'Events Participation' : 'Activity Participation'}</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Participator Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Event Time</th>
              <th className="px-4 py-2">Event Date</th>
              <th className="px-4 py-2">{activeTab === 'events' ? 'Event Name' : 'Activity Name'}</th>
            </tr>
          </thead>
          <tbody>
            {renderTableContent()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipationTabs;
