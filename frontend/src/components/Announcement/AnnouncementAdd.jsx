import React, { useState } from "react";
import { AddAnnouncement } from "../../apis/api";

function AnnouncementAdd({ onClose, onAddAnnouncement }) {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.description || !formData.date || !formData.type || !formData.time) {
      setError("All fields are required.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await AddAnnouncement(formData);
      console.log(response);
      onAddAnnouncement(response);
      onClose();
    } catch (error) {
      console.error(error);
      setError("Failed to add announcement.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Announcement</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-medium mb-1">
              Announcement Type<span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Type</option>
              <option value="event">Event</option>
              <option value="activity">Activity</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
              Announcement Title<span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded-lg p-2"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="flex space-x-2">
            <div className="mb-4 w-1/2">
              <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
                Announcement Date<span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4 w-1/2">
              <label htmlFor="time" className="block text-gray-700 font-medium mb-1">
                Announcement Time<span className="text-red-500">*</span>
              </label>
              <input
                id="time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-500 text-white py-2 px-4 rounded-xl"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AnnouncementAdd;
