import React, { useState, useEffect } from "react";
import { UpdateComplaint } from "../../apis/api";

function EditRequestForm({ closeModal, data, onComplaintAdd }) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await UpdateComplaint(formData);

    onComplaintAdd(); // Refresh the complaints list
    closeModal(); // Close the modal
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-opacity-5 pb-2">
          Edit Request
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium pb-2">
              Requester Name*
            </label>
            <input
              type="text"
              name="complainerName"
              value={formData.complainerName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Evelyn Harper"
            />
          </div>
          <div>
            <label className="block text-sm font-medium pb-2">
              Request Name*
            </label>
            <input
              type="text"
              name="complaintName"
              value={formData.complaintName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Unethical Behavior"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium pb-2">Wing*</label>
              <input
                type="text"
                name="wing"
                value={formData.wing || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="A"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium pb-2">Unit*</label>
              <input
                type="text"
                name="unit"
                value={formData.unit || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="1001"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Priority*</label>
            <div className="flex gap-6 pt-2">
              <label className="flex items-center border ps-7 pr-6 pt-2 pb-2 rounded-lg">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === "high"}
                  onChange={handleChange}
                  className="mr-2"
                />
                High
              </label>
              <label className="flex items-center border ps-7 pr-6 pt-2 pb-2 rounded-lg">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={formData.priority === "medium"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Medium
              </label>
              <label className="flex items-center border ps-7 pr-6 pt-2 pb-2 rounded-lg">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === "low"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Low
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Status*</label>
            <div className="flex gap-6 pt-2">
              <label className="border ps-7 pr-6 pt-2 pb-2 rounded-lg flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="open"
                  checked={formData.status === "open"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Open
              </label>
              <label className="border ps-7 pr-6 pt-2 pb-2 rounded-lg flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  checked={formData.status === "pending"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Pending
              </label>
              <label className="border ps-7 pr-6 pt-2 pb-2 rounded-lg flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="solve"
                  checked={formData.status === "solve"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Solve
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex justify-center gap-4 mt-4 w-1/2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border rounded-md w-full"
              >
                Cancel
              </button>
            </div>
            <div className="flex justify-center gap-4 mt-4 w-1/2">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md w-full"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRequestForm;
