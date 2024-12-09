import React, { useState } from "react";
import { UpdateNote } from "../../../apis/api";

function NoteEditPopup({ note, onClose, onNoteEdited }) {
  const [title, setTitle] = useState(note?.title || "");
  const [description, setDescription] = useState(note?.description || "");
  const [date, setDate] = useState(note?.date || "");

  const handleSave = async (e) => {
    e.preventDefault();

    // Prepare the updated note object
    const updatedNote = { ...note, title, description, date };

    // Call API to update the note
    try {
      const response = await UpdateNote(updatedNote);
      if (response.success) {
        onNoteEdited(); // Notify parent to refresh the notes
      } else {
        alert(response.message || "Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div>
      <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 sm:mx-0">
          <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoteEditPopup;