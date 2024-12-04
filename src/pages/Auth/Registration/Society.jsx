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

const Societypopup = ({ isOpenDrop, togglePopup }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipcode: ''
  });

  // Check if all fields are filled
  const isFormComplete = Object.values(formData).every(field => field.trim() !== '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await CreateSociety(formData);
    if (data?.data?.status === 1) {
      togglePopup();
    }
  };

  const [wingCount, setWingCount] = useState(1);
  const [wings, setWings] = useState(
    Array.from({ length: 1 }, () => ({
      floor: '',
      flats: '',

    }))
  );

  const handleWingCountChange = (event) => {
    const count = Number(event.target.value);
    setWingCount(count);

    // Adjust the number of members in the array
    setWings((prevWings) => {
      if (count > prevWings.length) {
        return [
          ...prevWings,
          ...Array.from({ length: count - prevWings.length }, () => ({
            floor: '',
            flats: '',

          }))
        ];
      } else {
        return prevWings.slice(0, count);
      }
    });
  };

  const handleInputChange = (index, field, value) => {
    setWings((prevWings) => {
      const updatedWings = [...prevWings];
      updatedWings[index][field] = value;
      return updatedWings;
    });
  };

  return (
    <>
      {isOpenDrop && (
        <div style={popupStyle}>
          <div className='rounded-2xl'>
            <div className="flex items-center bg-gray-100 rounded-2xl">
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6">Create New Society</h2>
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

                  <div className=" mt-3">
                    <div className="">
                      <div className=" ">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold text-gray-800">Wing Counting: </h2>
                          <div className="flex items-center">
                            <label className="mr-2 text-gray-600">How Many Wing</label>
                            <select
                              value={wingCount}
                              onChange={handleWingCountChange}
                              className="border border-gray-300 p-2 rounded-md"
                            >
                              {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* {wings.map((wings, index) => ( */}
                        <div className="flex flex-wrap     space-y-4 sm:space-y-0 p-1 ">
                          <div className="flex flex-col w-full  sm:w-1/2 px-1">
                            <label className="text-gray-600 font-semibold">How Many Floor Flat<span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              placeholder="How Many Flore Flat"
                              className="border border-gray-300 p-2 rounded-md"
                              value={wings.floor}
                              onChange={(e) => handleInputChange(index, 'flore', e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col w-full sm:w-1/2">
                            <label className="text-gray-600 font-semibold">
                              How Many Flat per Floor<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              placeholder="How Many Flat per Floor"
                              className="border border-gray-300 p-2 rounded-md"
                              value={wings.flats}
                              onChange={(e) => handleInputChange(index, 'flat', e.target.value)}
                            />
                          </div>




                        </div>
                        {/* ))} */}
                      </div>
                    </div>
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
                        placeholder="Enter Country"
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
                        placeholder="Enter State"
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
                        placeholder="Enter City"
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
                    <button
                      type="button"
                      onClick={togglePopup}
                      className="bg-transparent border border-zinc-400 text-gray-700 py-2 px-4 rounded-lg"
                      style={{ width: '170px', height: '51px' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-black py-2 px-4 rounded-lg"
                      style={{
                        width: '170px',
                        height: '51px',
                        color: "#ffffff",
                        background: isFormComplete
                          ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)'
                          : 'rgb(229 231 235)' // default gray color
                      }}
                      disabled={!isFormComplete} // Prevent submission when incomplete
                    >
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
  );
};

export default Societypopup;
