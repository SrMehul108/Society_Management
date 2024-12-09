import React, { useState, useEffect } from 'react';
import { GetAnnouncementUser } from '../../../apis/api';

const ParticipationTabs = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [data, setData] = useState({ events: [], activities: [] });
  const [loading, setLoading] = useState(false);

  // Function to fetch data based on the tab type
  const fetchData = async (type) => {
    setLoading(true);
    try {
      const response = await GetAnnouncementUser(type);
      const result = await response;
      setData(prevData => ({
        ...prevData,
        [type]: result.data, // Assuming the API returns { data: [...] }
      }));
    } catch (error) {
      console.log(error)
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab); // Fetch data when activeTab changes
  }, [activeTab]);

  const renderTableContent = () => {
    const content = activeTab === 'events' ? data.events : data.activities;
    return content?.map((item, index) => (
      <tr key={index} className="border-b border-gray-200">
        <td className="px-4 py-3 flex ">
          <div className='pr-3  items-center justify-center flex'>
            <img src={item.img} alt='' className='border w-10 h-10 rounded-full' />
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
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'events' ? 'text-white bg-orange-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('events')}
        >
          Events Participate
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'activities' ? 'text-white bg-orange-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('activities')}
        >
          Activity Participate
        </button>
      </div>

      <div className="border bg-white p-3">
        <h2 className="text-sm font-bold mb-2">{activeTab === 'events' ? 'Events Participation' : 'Activity Participation'}</h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-start">Participator Name</th>
                <th className="px-4 py-2 text-start">Description</th>
                <th className="px-4 py-2 text-start">Event Time</th>
                <th className="px-4 py-2 text-start">Event Date</th>
                <th className="px-4 py-2 text-start">{activeTab === 'events' ? 'Event Name' : 'Activity Name'}</th>
              </tr>
            </thead>
            <tbody>
              {renderTableContent()}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ParticipationTabs;
