import React, { useState } from 'react';
import { AddRequest } from '../../../apis/api';

function RequestForm({ closeModal, onRequestAdd }) {
  const [formData, setFormData] = useState({
    complainerName: '',
    complaintName: '',
    description: '',
    wing: '',
    unit: '',
    date: '',
    priority: 'low',  // Default to "low"
    status: 'pending', // Default to "pending"
    type: 'request',
  });
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

   

    setIsSaving(true);
    try {
      const response = await AddRequest(formData);
      onRequestAdd(response);
      closeModal();
    } catch (error) {
      console.error('Error adding Complaint:', error);
      setError('Failed to add Complaint. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Create Request</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div>
            <label className="block text-sm font-medium">
              Requester Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="complainerName"
              value={formData.complainerName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Evelyn Harper"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Request Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="complaintName"
              value={formData.complaintName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Unethical Behavior"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Wing<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="wing"
                value={formData.wing}
                onChange={handleChange}
                className="border rounded py-2"
                placeholder="Enter Wing"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Unit<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="border rounded py-2"
                placeholder="Enter Unit"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Priority<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6 pt-2">
              <label className="border ps-6 pr-6 pt-2 pb-2 rounded-lg">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === "high"}
                  onChange={handleChange}
                  className="mr-1"
                />
                High
              </label>
              <label className="border ps-6 pr-6 pt-2 pb-2 rounded-lg">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={formData.priority === "medium"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Medium
              </label>
              <label className="border ps-6 pr-6 pt-2 pb-2 rounded-lg">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === "low"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Low
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Status<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6 pt-2">
              <label className="border ps-6 pr-6 pt-2 pb-2 rounded-lg">
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
              <label className="border ps-6 pr-6 pt-2 pb-2 rounded-lg">
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
              <label className="border ps-6 pr-6 pt-2 pb-2 rounded-lg">
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
                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white rounded-md w-full"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestForm;
