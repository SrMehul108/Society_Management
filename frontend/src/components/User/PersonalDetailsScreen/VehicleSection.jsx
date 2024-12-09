import React from 'react';

const VehiclesSection = ({ vehicles }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-lg font-semibold mb-4">Vehicles:({vehicles.length})</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {vehicles.map((vehicle, index) => (
        
        <div key={index} className="border  rounded-lg">
        <div className='p-2 bg-blue-600 rounded-t-lg'>
            <h4 className="font-semibold text-white ">{vehicle.type}</h4>

        </div>
        <div className='p-2 font-semibold'>
            <div className='flex'>
                <div className='w-1/3'><p>Vehicle </p></div>
                <div className='text-end w-2/3'>{vehicle.name}</div>
            </div>
            
            <div className='flex'>
                <div className='w-1/3'><p>Vehicle number </p></div>
                <div className='text-end w-2/3'>{vehicle.number}</div>
            </div>
           
        </div>
    </div>
      ))}
    </div>
  </div>
);

export default VehiclesSection;
