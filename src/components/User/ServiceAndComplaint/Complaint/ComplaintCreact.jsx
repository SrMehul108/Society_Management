import React, { useState } from "react";
import { AddUserComplaint } from "../../../../apis/api";

function ComplaintCreate({ closeModal, type, HandleAdd }) {
    const currentDate = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

    const [formData, setFormData] = useState({
      complainerName: "", // Added field
      complaintName: "",
      description: "",
      wing: "",
      unit: "",
      date: currentDate, // Default date is the current date
      priority: "low", // Default priority
      status: "pending", // Default status
      type: type, // type comes from parent, either "complaint" or "request"
    });
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate all fields, excluding the removed complaintType field
    if (
      !formData.complainerName ||
      !formData.complaintName ||
      !formData.description ||
      !formData.wing ||
      !formData.unit ||
      !formData.priority ||
      !formData.status
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      setIsSaving(true); // Set saving to true when submitting
      const response = await AddUserComplaint(formData);
      console.log("res", response);
      HandleAdd();
      closeModal();
    } catch (error) {
      console.log(error);
      setError("Failed to add. Please try again.");
    } finally {
      setIsSaving(false); // Set saving to false after the process
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 sm:p-8 rounded-lg max-w-md w-full mx-4 sm:mx-0">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Create {type === "complaint" ? "Complaint" : "Request"}
        </h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Complainer Name*</label>
            <input
              type="text"
              name="complainerName"
              value={formData.complainerName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter Complainer's Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Complaint Name*</label>
            <input
              type="text"
              name="complaintName"
              value={formData.complaintName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Evelyn Harper"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter Description"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium">Wing*</label>
              <input
                type="text"
                name="wing"
                value={formData.wing}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter Wing"
                required
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium">Unit*</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter Unit"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Priority*</label>
            <div className="flex gap-2 sm:gap-6 pt-2 flex-wrap">
              <label className="border px-4 py-2 rounded-lg text-sm">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === "high"}
                  onChange={handleRadioChange}
                  className="mr-1"
                />
                High
              </label>
              <label className="border px-4 py-2 rounded-lg text-sm">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={formData.priority === "medium"}
                  onChange={handleRadioChange}
                  className="mr-1"
                />
                Medium
              </label>
              <label className="border px-4 py-2 rounded-lg text-sm">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === "low"}
                  onChange={handleRadioChange}
                  className="mr-1"
                />
                Low
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Status*</label>
            <div className="flex gap-2 sm:gap-6 pt-2 flex-wrap">
              <label className="border px-4 py-2 rounded-lg text-sm">
                <input
                  type="radio"
                  name="status"
                  value="open"
                  checked={formData.status === "open"}
                  onChange={handleRadioChange}
                  className="mr-1"
                />
                Open
              </label>
              <label className="border px-4 py-2 rounded-lg text-sm">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  checked={formData.status === "pending"}
                  onChange={handleRadioChange}
                  className="mr-1"
                />
                Pending
              </label>
              <label className="border px-4 py-2 rounded-lg text-sm">
                <input
                  type="radio"
                  name="status"
                  value="solve"
                  checked={formData.status === "solve"}
                  onChange={handleRadioChange}
                  className="mr-1"
                />
                Solve
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-1/2 px-4 py-2 border rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white py-2 px-4 rounded-xl w-full"
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

export default ComplaintCreate;
