import React from 'react';

function SecurityPopup({ closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Visitor Details</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Visitor Name*</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Evelyn Harper"
            />
          </div>
         
          
          <div className="flex gap-4">
            <div className='w-1/2'>
              <label className="block text-sm font-medium">Wing*</label>
              <input
                type="text"
                className="border rounded  py-2"
                placeholder="Enter Wing"
              />
            </div>
            <div className='w-1/2'>
              <label className="block text-sm font-medium">Unit*</label>
              <input
                type="text"
                className="border rounded  py-2"
                placeholder="Enter Unit"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className='w-1/2'>
              <label className="block text-sm font-medium">Date*</label>
              <input
                type="date"
                className="border rounded  py-2 w-full"
               
              />
            </div>
            <div className='w-1/2'>
              <label className="block text-sm font-medium">Time*</label>
              <input
                type="time"
                className="border rounded  py-2 w-full"
                
              />
            </div>
          </div>

          <div className='flex gap-2' >
            <div className="flex justify-center gap-4 mt-4 w-1/2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded-md w-full"
            >
              Cancel
            </button>
           
            </div>
            <div className="flex justify-center gap-4 mt-4 w-1/2">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md w-full"
            >
              Save
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SecurityPopup;
