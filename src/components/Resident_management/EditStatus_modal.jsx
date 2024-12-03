import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditStatusModal = ({ onClose }) => {
  const [status, setStatus] = useState("occupied");
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAgreed) {
      alert(`Form submitted with status: ${status}`);
      navigate("/admin/residents/OwnerForm");
      onClose(); // Close the popup after successful submission
    } else {
      alert("You must agree to submit the form.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Residence Status</h2>

        {/* Radio Buttons Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label
              className={`flex items-center w-1/2 cursor-pointer px-3 py-1 rounded-lg ${
                status === "occupied" ? "border-2 border-orange-400" : "border"
              }`}
            >
              <input
                type="radio"
                name="status"
                value="occupied"
                checked={status === "occupied"}
                onChange={() => setStatus("occupied")}
                className="form-radio text-orange-500"
              />
              <span className="ml-4">Occupied</span>
            </label>
            <label
              className={`flex items-center cursor-pointer px-3 py-1 rounded-lg w-1/2 ${
                status === "vacate" ? "border-2 border-orange-400" : "border"
              }`}
            >
              <input
                type="radio"
                name="status"
                value="vacate"
                checked={status === "vacate"}
                onChange={() => setStatus("vacate")}
                className="form-radio text-orange-500"
                disabled
              />
              <span className="ml-4">Vacate</span>
            </label>
          </div>

          {/* Checkbox Agreement */}
          <label className="flex items-start space-x-2 text-gray-600 text-sm">
            <input
              type="checkbox"
              className="form-checkbox text-orange-500"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              required
            />
            <span>By submitting, you agree to select Occupied</span>
          </label>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 w-full text-center font-semibold text-gray-600 border rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 w-full text-center font-semibold text-white bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStatusModal;
