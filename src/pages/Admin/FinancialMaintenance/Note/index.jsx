import React, { useRef, useState } from "react";
import NoteEditPopup from "../../../../components/Financial/Note/NoteEdit";
import CreateAdd from "../../../../components/Financial/Note/NoteCreact";

const note = [
  {
    id: 1,
    title: "Parking Facilities",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 2,
    title: "Community Center",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 3,
    title: "Swimming Pool",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 4,
    title: "Parks and Green Spaces",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 5,
    title: "Wi-Fi and Connectivity",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
  {
    id: 6,
    title: "Pet-Friendly Facilities",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
  },
];

export const AddNote = () => {
  const [menuVisible, setMenuVisible] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible((prev) => (prev === id ? null : id));
  };
  // create Note popup
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
    <div className="p-4 sm:p-6 bg-white w-full rounded-xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">Note</h1>
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
          onClick={openPopup}
        >
          Create Note
        </button>
        {isPopupOpen && <CreateAdd onClose={closePopup} />}
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {note.map((note) => (
          <div key={note.id} className="rounded-lg border relative">
            <div className="bg-blue-500 rounded-t-lg flex justify-between items-center p-3">
              <h2 className="font-semibold text-xl text-white">
                {note.title}
              </h2>
              <div className="relative">
                <i
                  className="fas fa-ellipsis-h text-gray-600 bg-white p-1 rounded-sm cursor-pointer"
                  onClick={() => toggleMenu(note.id)}
                ></i>
                {menuVisible === note.id && (
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
              <h2 className="font-normal text-gray-500">Description</h2>
              <p>{note.description}</p>
            </div>
          </div>
        ))}
        {isPopupEdit && <NoteEditPopup onClose={EditclosePopup} />}
      </div>
    </div>
  );
};
