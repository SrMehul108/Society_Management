import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../apis/api";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const isFormValid =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "confirmPassword" || name === "password") {
      setShowError(false); // Clear error on input change
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setShowError(true); // Only set error when form is invalid
      return;
    }

    try {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        alert("Email not found. Please restart the process.");
        return;
      }

      // Add email to formData
      const dataToSend = {
        ...formData,
        email, // Include email in the payload
      };
      
      const response = await resetPassword(dataToSend);
      console.log("Password reset successful:", response);
      navigate("/login");
    } catch (error) {
      console.error("Password Reset Failed:", error);
      setShowError(true);
    }
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Reset Password
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password*
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                showError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password*
          </label>
          <div className="mt-1 relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                showError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {showError && !isFormValid && (
          <div className="text-red-500 text-sm mt-1">
            Passwords do not match.
          </div>
        )}

        <div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isFormValid ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-400"
            }`}
            disabled={!isFormValid}
          >
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
};
