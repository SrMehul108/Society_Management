import React, { useState } from 'react';
import { DeleteProtocol } from '../../../apis/api';

function SecurityDelete({ closeModal,protocolId,fetchProtocols }) {
  const[isLoading,setIsLoading]=useState(false);
  const [error, setError] = useState(null);
  const handleDelete =async () => {
    if (!protocolId) {
      setError("Protocol ID")
      return
    }
    setIsLoading(true);
    setError(null)
    try {
      await DeleteProtocol(protocolId)
      fetchProtocols()
      closeModal()
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg ">
        <h2 className="text-xl font-semibold mb-2 border-b-2 pb-2">Delete Protocol?</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this Request?</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
              className="px-4 py-2 bg-red-500 text-white rounded-md w-full"
              disabled={isLoading}
              onClick={handleDelete}
            >
             {isLoading ? "Deleting..." : "Delete"}
            </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SecurityDelete;
