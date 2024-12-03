import React, { useState } from "react";
import { AddNote } from "../../../apis/api";

function CreateAdd({ onClose,onNoteAdded }) {
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [errors, setErrors] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value }); // Fixed `formData` typo
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrors(null);
    if (!formdata.title || !formdata.description || !formdata.date) {
      setErrors("Please fill all the fields");
      return;
    }
    setIsSaving(true);
    try {
      const response = await AddNote(formdata);
      console.log(response);
      onNoteAdded();
      onClose();
    } catch (error) {
      console.error(error);
      setErrors("Failed to add note");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Note</h2>
        {errors && <div className="mb-4 text-red-600 text-sm">{errors}</div>}
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formdata.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter Note name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formdata.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter description"
              rows="3"
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
              name="date"
              value={formdata.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex  space-x-2">
            <div className="w-1/2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 w-full bg-gray-300 text-gray-700 rounded-lg"
              disabled={isSaving}
            >
              Cancel
            </button>
           
            </div>
            <div className="w-1/2">
            <button
              type="submit"
              className={`px-4 py-2 w-full text-white rounded-lg ${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500"
              }`}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAdd;
