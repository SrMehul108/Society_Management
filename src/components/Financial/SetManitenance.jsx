import { useState } from "react";
import { submitMaintenance } from "../../apis/api";

export const Modal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await submitMaintenance(password);
      alert(`Response: ${response.message}`); // Adjust this based on your API response
      onClose();
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-xl font-semibold mb-4 pb-3 border-b-2">Set Maintenance</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password<span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  {/* Eye closed icon */}
                  <path d="M..." />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  {/* Eye open icon */}
                  <path d="M..." />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div className="flex justify-between pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 ${
              loading ? "bg-gray-400" : "bg-gradient-to-r from-orange-400 to-orange-600"
            } text-white font-semibold rounded-lg hover:from-orange-500 hover:to-orange-700 transition`}
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};
