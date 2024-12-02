import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import login from "../../../assets/image/forget.png";
import "../../../assets/css/login/login.css";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../apis/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const ForgetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsFormValid(value.trim() !== "");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(formData);
      localStorage.setItem("userEmail", formData.email);
      toast.success("OTP  sent to your email");
      navigate("/otp");
    }
    catch (error) {
      console.error("Otp failed:", error);
      toast.error("Email Not Found")
      setShowError(true);
    }
  };

  

  return (
    <>
    <ToastContainer/>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Forget Password
      </h2>
      <h5 className="text-sm text-center mb-4">
        Enter your email address and we will send you a link to reset your
        password.
      </h5>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setShowError(true);
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email or Phone*
          </label>
          <input
            id="email"
            name="email"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="+91 92019 32452"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            onClick={handleClick}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${isFormValid
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!isFormValid}
          >
            Get OTP
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        <Link
          to="/login"
          className="font-medium text-orange-600 hover:text-orange-500"
        >
          Back To Login
        </Link>
      </p>
    </>
  );
};
