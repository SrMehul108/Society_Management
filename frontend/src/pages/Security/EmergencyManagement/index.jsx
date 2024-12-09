import { useState } from "react";
import { AddSecurityEmergency } from "../../../apis/api";

export default function EmergencyManagement() {
  const [formData, setFormData] = useState({
    type: "warning", // Default alert type
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await AddSecurityEmergency(formData);
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 w-96 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Emergency Alert</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Alert Type */}
          <div className="space-y-2">
            <label htmlFor="alertType" className="block text-sm">
              Alert Type*
            </label>
            <input
              type="text"
              id="alertType"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[100px] resize-none"
              placeholder="Provide a detailed account of the emergency situation."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-md hover:from-orange-600 hover:to-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
