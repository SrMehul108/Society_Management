import { useState } from "react";

export const Modal = ({ isOpen, onClose }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/6   ">
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
                      <path d="M10 4c3.452 0 6.45 2.136 8.485 5-.564.882-1.19 1.693-1.863 2.412l-1.433-1.432c.341-.519.641-1.083.906-1.648A10.079 10.079 0 0010 6C7.332 6 5.03 7.786 3.713 10c.41.69.904 1.339 1.464 1.935l-1.427 1.428A10.078 10.078 0 011.515 10C3.55 7.136 6.548 4 10 4zM2.93 2.93l14.14 14.14-1.415 1.415L11.586 15.1c-1.34.526-2.84.901-4.586.901a10.08 10.08 0 01-3.9-.75L2.515 14a9.992 9.992 0 001.658-1.242L2.515 10c-1.047-1.618-1.512-3.386-1.512-5.05C1.003 3.553 4.454.937 8.096.071l1.414 1.415A8.098 8.098 0 0010 2c3.017 0 5.835 1.707 7.49 4.515l1.417 1.417L18.93 6.343C17.595 3.835 14.878 2 10 2c-1.846 0-3.544.496-5.029 1.338L2.93 2.93z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.333 10.292C3.515 8.97 5.786 7 10 7c1.444 0 2.667.39 3.605.947l.703-.703C12.716 6.732 11.46 6 10 6c-4.548 0-7.55 3.056-8.485 4.707a1 1 0 000 1.172C2.45 13.944 5.452 17 10 17c1.423 0 2.682-.3 3.635-.764l-.688-.688c-.83.299-1.77.452-2.947.452-4.164 0-6.883-2.556-8.157-4.112A8.117 8.117 0 0110 9c.93 0 1.835.108 2.702.314l.753-.753a8.033 8.033 0 00-3.455-.819c-3.934 0-6.949 2.304-8.157 4.048a1 1 0 001.416 1.416c1.171-1.22 3.727-3.5 8.157-3.5.693 0 1.374.064 2.027.193L10 13.586 2.333 5.927a1 1 0 00-1.414 1.415L2.333 10.292z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
    
            {/* Button Row */}
            <div className="flex justify-between pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => alert("Continue Clicked")}
                className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-orange-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      );
  };