import React, { useState, useEffect } from "react";
import { CiClock2 } from "react-icons/ci";
import { otpPage } from "../../../apis/api";

export const OtpPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(true);
  const isOtpComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (isActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsActive(false);
    }
  }, [isActive, timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Allow only digits
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus(); // Move to the next input
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus(); // Move to the previous input
    }
  };

  const handleResend = () => {
    setTimer(60);
    setIsActive(true);
    setOtp(Array(6).fill(""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await otpPage(otp);
    alert(`OTP Submitted: ${otp.join("")}`);
    }
    catch (error) {
      console.error("Otp failed:", error);
      setShowError(true);
    }
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Enter OTP
      </h2>
      <h5 className="text-sm text-center mb-4">
        Please enter the 6 digit code sent to your phone number.
      </h5>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex justify-center space-x-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder="0"
              className="border border-gray-300 rounded text-center w-12 h-12 text-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              maxLength="1"
            />
          ))}
        </div>

        <div className="flex justify-center mb-4">
          {isActive ? (
            <div className="flex items-center text-black-600">
              <CiClock2 className="mr-2" />
              <span>00: {timer} sec</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-red-500 font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>

        <button
          className={`w-full py-2 text-white rounded ${
            isOtpComplete
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={isOtpComplete ? handleSubmit : null}
          disabled={!isOtpComplete}
        >
          Verify
        </button>
      </form>
    </>
  );
};
