import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { addimportantNumber, UpdateImportantnumber } from "../../../apis/api";
import { useNavigate } from "react-router";

function AddNumberPopup({
  mode = "add",
  initialData = {},
  onClose,
  onImportantNumberAdded,
  editid
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNo: "",
    work: "",
  });
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.fullName || !formData.phoneNo || !formData.work) {
      setError("All fields are required!");
      return;
    }
    setIsSaving(true);
    if (mode !=="edit") {
        try {
            const response = await addimportantNumber(formData);
            onImportantNumberAdded();
            onClose();
          } catch (error) {
            console.log(error);
            setError("Failed to add number. Please try again.");
          } finally {
            setIsSaving(false);
          }
    }

    if (mode === "edit") {
      try {
        const response = await UpdateImportantnumber(formData,editid);
        onImportantNumberAdded();
        onClose();
      } catch (error) {
        console.log(error);
        setError("Failed to add number. Please try again.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
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
              placeholder="Joe doe"
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
              placeholder="+00 00000 00000"
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
              placeholder="Work"
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
  );
}

AddNumberPopup.propTypes = {
  mode: PropTypes.oneOf(["add", "edit"]),
  initialData: PropTypes.shape({
    fullName: PropTypes.string,
    phoneNumber: PropTypes.string,
    work: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default AddNumberPopup;
