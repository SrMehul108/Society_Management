import React from 'react';

function SecurityEdit({ closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-opacity-5 pb-2">Edit Security Protocols</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium pb-2">Title*</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Evelyn Harper"
            />
          </div>
          <div>
            <label className="block text-sm font-medium pb-2">Decription*</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Evelyn Harper"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium pb-2">Date*</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                placeholder="DD/MM/YYYY"
              />
              
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium pb-2">Time*</label>
              <input
                type="time"
                className="w-full border rounded px-3 py-2"
                placeholder="1001"
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
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white rounded-md w-full"
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

export default SecurityEdit;
