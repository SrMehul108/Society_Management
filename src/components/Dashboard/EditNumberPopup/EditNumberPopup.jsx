import { useState } from "react";
import { UpdateImportantnumber } from "../../../apis/api";

export const EditNumberPopup = ({ mode, data, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      fullName: data?.fullName || "",
      phoneNo: data?.phoneNo || "",
      work: data?.work || "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSave = async () => {
      setError(""); // Clear previous errors
      setIsSaving(true);
      try {
        const result = await UpdateImportantnumber(formData);
        if (result.success) {
          onSave(result.data); // Call onSave to notify parent about successful save
          onClose(); // Close the popup
        } else {
          setError(result.message || "An error occurred while saving.");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsSaving(false);
      }
    };
  
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "edit" ? "Edit Important Number" : "Add Number"}
            </h2>
            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
            <form>
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Work<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="work"
                  value={formData.work}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
            </form>
            <div className="flex justify-between mt-6 gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 w-1/2"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
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
        </div>
      </>
    );
  };