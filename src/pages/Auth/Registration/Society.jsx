import { useState } from "react";
import { CreateSociety } from "@/apis/api";
const popupStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};
const popupContentStyle = {
  padding: '20px',
  borderRadius: '5px',
};




const Societypopup = ({ isOpenDrop, togglePopup }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipcode: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let data = await CreateSociety(formData)
    console.log();
    
    if(data.data.status == 1){
      togglePopup();
    }
  };

  return (
    <>
      {isOpenDrop && (
        <div style={popupStyle}>
          <div className='rounded-2xl'>
            <div className="flex items-center bg-gray-100 rounded-2xl">
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full ">
                <h2 className="text-2xl font-bold mb-6 ">Create New Society</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Society Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter Name"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Society Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter Address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                        Zip Code<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter Zip Code"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between my-5">
                    <button type="button" onClick={togglePopup} className="bg-transparent border border-zinc-400 text-gray-700 py-2 px-4 rounded-md" style={{ width: '170px', height: '51px' }}>
                      Cancel
                    </button>
                    <button type="submit" className="bg-slate-200 text-black py-2 px-4 rounded-md " style={{ width: '170px', height: '51px' }}>
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      )}

    </>
  )
}

export default Societypopup;