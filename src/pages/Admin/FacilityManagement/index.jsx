import React, { useRef, useState } from "react";
import FacilityPopup from "../../../components/Facility/CreactFacility";
import EditPopup from "../../../components/Facility/EditFacility";

const facilities = [
  {
    id: 1,
    title: "Parking Facilities",
    date: "01/07/2024",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 2,
    title: "Community Center",
    date: "01/07/2024",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 3,
    title: "Swimming Pool",
    date: "01/07/2024",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 4,
    title: "Parks and Green Spaces",
    date: "01/07/2024",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 5,
    title: "Wi-Fi and Connectivity",
    date: "01/07/2024",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 6,
    title: "Pet-Friendly Facilities",
    date: "01/07/2024",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
];

export const FacilityManagement = () => {
  const [menuVisible, setMenuVisible] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible((prev) => (prev === id ? null : id));
  };
  // create facility popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    console.log("creact");

    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Edit facility popup
  const [isPopupEdit, setIsPopupEdit] = useState(false);

  const editPopup = () => {
    console.log("edit");

    setIsPopupEdit(true);
  };

  const EditclosePopup = () => {
    setIsPopupEdit(false);
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
        {isPopupOpen && <FacilityPopup onClose={closePopup} />}
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {facilities.map((facility) => (
          <div className="border rounded-xl">
            <div key={facility.id} className=" flex flex-col">

              <div className="flex justify-between items-center bg-blue-500 p-4 rounded-t-xl">
                <h2 className="text-lg font-semibold text-white">
                  {facility.title}
                </h2>
                <div className="relative">
                  <i
                    className="fas fa-ellipsis-h text-gray-600 bg-white p-1 rounded-sm cursor-pointer"
                    onClick={() => toggleMenu(facility.id)}
                  ></i>
                  {menuVisible === facility.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={editPopup}
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
        ))}
        {isPopupEdit && <EditPopup onClose={EditclosePopup} />}
      </div>
    </div>
  );
};
