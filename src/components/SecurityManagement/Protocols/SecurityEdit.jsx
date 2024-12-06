import React, { useEffect, useState } from "react";
import { EditProtocol } from "../../../apis/api";

function SecurityEdit({ isOpen, closeModal, itemToEdit, protocolId, onProtocolUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState("");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        title: itemToEdit.title || "",
        description: itemToEdit.description || "",
        date: itemToEdit.date || "",
        time: itemToEdit.time || "",
      });
    }
  }, [itemToEdit]);

  useEffect(() => {
    const isValid = formData.title && formData.description && formData.date && formData.time;
    setIsSaveEnabled(isValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSaveEnabled) {
      setError("All fields marked with * are required.");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
      };

      const response = await EditProtocol(payload, protocolId);

      if (response.success) {
        onProtocolUpdated();
        closeModal();
      } else {
        setError("Failed to update protocols. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-opacity-5 pb-2">
            Edit Security Protocols
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium pb-2">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium pb-2">
                Description<span className="text-red-500">*</span>
              </label>
              <input
                id="description"
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="date" className="block text-sm font-medium pb-2">
                  Date<span className="text-red-500">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="time" className="block text-sm font-medium pb-2">
                  Time<span className="text-red-500">*</span>
                </label>
                <input
                  id="time"
                  type="time"
                  className="w-full border rounded px-3 py-2"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border rounded-md w-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-md w-full transition duration-300 ${
                  isSaveEnabled
                    ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700"
                    : "bg-gray-300 text-white cursor-not-allowed"
                }`}
                disabled={!isSaveEnabled}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default SecurityEdit;
