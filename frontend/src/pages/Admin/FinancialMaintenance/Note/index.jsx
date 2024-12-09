import React, { useEffect, useState, useRef } from "react";
import NoteEditPopup from "../../../../components/Financial/Note/NoteEdit";
import CreateAdd from "../../../../components/Financial/Note/NoteCreact";
import { GetNotes } from "../../../../apis/api";

const AddNote = () => {
  const [noteData, setNoteData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);

  // States for popups
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupEdit, setIsPopupEdit] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Ref for managing dropdowns
  const menuRef = useRef({});

  // Toggle menu visibility
  const toggleMenu = (id) => {
    setMenuVisible(prev => prev === id ? null : id);
  };

  // Open Create Note Popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Open Edit Note Popup
  const editPopup = (note) => {
    setSelectedNote(note);
    setIsPopupEdit(true);
    setMenuVisible(null); // Close the dropdown
  };

  const EditclosePopup = () => {
    setSelectedNote(null);
    setIsPopupEdit(false);
  };

  // Fetch notes data
  const fetchData = async () => {
    try {
      const data = await GetNotes();
      setNoteData(data);
    } catch (error) {
      console.log("Error in Fetching Notes", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle new note added
  const handleNoteAdded = () => {
    fetchData();
    closePopup();
  };

  // Handle editing note
  const handleNoteEdited = () => {
    fetchData();
    EditclosePopup();
  };

  return (
    <div className="p-4 sm:p-6 bg-white w-full rounded-xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">Note</h1>
        <button
          className=" text-white py-2 px-4 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 transition-all"
          onClick={openPopup}
        >
          Create Note
        </button>
        {isPopupOpen && (
          <CreateAdd onClose={closePopup} onNoteAdded={handleNoteAdded} />
        )}
      </div>

      {/* Notes Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {noteData?.map((note) => (
          <div key={note._id} className="rounded-lg border relative">
            <div className="rounded-t-lg flex justify-between items-center p-3" style={{backgroundColor:"#5678e9"}}>
              <h2 className="font-semibold text-xl text-white">{note.title}</h2>
              <div className="relative">
                <i
                  className="fas fa-ellipsis-h text-gray-600 bg-white p-1 rounded-sm cursor-pointer"
                  onClick={() => toggleMenu(note._id)}
                ></i>
                {menuVisible === note._id && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10"
                    ref={(el) => (menuRef.current[note._id] = el)}
                  >
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-black font-bold hover:bg-gray-100"
                      onClick={() => editPopup(note)}
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
        {isPopupEdit && selectedNote && (
          <NoteEditPopup
            note={selectedNote}
            onClose={EditclosePopup}
            onNoteEdited={handleNoteEdited}
          />
        )}
      </div>
    </div>
  );
};

export default AddNote;
