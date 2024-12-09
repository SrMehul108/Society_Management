import React, { useState, useEffect } from "react";
import FacilityPopup from "@/components/Facility/CreactFacility";
import EditPopup from "@/components/Facility/EditFacility";
import { getFacility } from "@/apis/api";

const FacilityManagement = () => {
  const [menuVisible, setMenuVisible] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [error, SetError] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible((prev) => (prev === id ? null : id));
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const [isPopupEdit, setIsPopupEdit] = useState(false);
  const [editFacility, setEditFacility] = useState(null); // Track the facility to be edited

  const editPopup = (facility) => {
    setEditFacility(facility); // Set the facility to be edited
    setIsPopupEdit(true);
    setMenuVisible(null); // Close the dropdown when editing starts
  };

  const EditclosePopup = () => {
    setIsPopupEdit(false);
    setEditFacility(null);
  };

  const fetchFacilities = async () => {
    try {
      const response = await getFacility();
      setFacilities(response);
    } catch (error) {
      console.log(error);
      SetError(error.message);
    }
  };

  // Fetch facilities when the component mounts
  useEffect(() => {
    fetchFacilities();
  }, []);

  const EditData = (data) => {};

  // Handle facility added in the popup form
  const handleFacilityAdded = () => {
    fetchFacilities();
    closePopup();
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
          Facility Management
        </h1>
        <button
          className=" text-white py-2 px-4 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 transition-all"
          onClick={openPopup}
        >
          Create Facility
        </button>
        {isPopupOpen && (
          <FacilityPopup
            onClose={closePopup}
            onFacilityAdded={handleFacilityAdded}
          />
        )}
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <div key={facility._id} className="border rounded-xl">
              <div className="flex flex-col">
                <div className="flex justify-between items-center bg-blue-500 p-4 rounded-t-xl">
                  <h2 className="text-lg font-semibold text-white">
                    {facility.facilityName}
                  </h2>
                  <div className="relative">
                    <i
                      className="fas fa-ellipsis-h text-gray-600 bg-white p-1 rounded-sm cursor-pointer"
                      onClick={() => toggleMenu(facility._id)} // Toggle the dropdown for the clicked facility
                    ></i>
                    {/* Only show the dropdown if this facility's ID matches menuVisible */}
                    {menuVisible === facility._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => editPopup(facility)} // Pass the facility to edit
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-500">
                      Upcoming Schedule Service Date
                    </p>
                    <span className="ml-2 text-black">{facility.date}</span>
                  </div>
                  <div>
                    <h2 className="font-normal text-gray-500">Description</h2>
                    <p>{facility.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No facilities found.</div>
        )}
        {isPopupEdit && (
          <EditPopup
            onClose={EditclosePopup} 
            facility={editFacility}
            facilityId={editFacility._id} 
            EditData={EditData} 
            onFacilityAdded={handleFacilityAdded}
          />
        )}
      </div>
    </div>
  );
};

export default FacilityManagement;
