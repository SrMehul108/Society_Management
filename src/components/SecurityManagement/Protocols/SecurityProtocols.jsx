import React, { useState } from "react";
import { AddProtocol } from "../../../apis/api";

function SecurityProtocols({ onClose,onAddProtocols }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError("All fields are required!");
      return;
    }
    setIsSaving(true);
    try {
      const response = await AddProtocol(formData);
      onAddProtocols()
      onClose()
    } catch (error) {
      console.log(error);
      setError("Failed to add protocol. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Security Protocol</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title<span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Description"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex justify-center gap-4 mt-4 w-1/2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md w-full"
              >
                Cancel
              </button>
            </div>
            <div className="flex justify-center gap-4 mt-4 w-1/2">
              <button
                type="submit"
                onClick={handleSave}
                className={`px-4 py-2 text-white rounded-lg w-1/2 ${
                  isSaving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
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

export default SecurityProtocols;
