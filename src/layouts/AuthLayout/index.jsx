import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import loginImage from "../../assets/image/login.png";
import ForgetImage from "../../assets/image/forget.png";
import registerImage from "../../assets/image/register.png";
import "../../assets/css/login/login.css";

export const AuthLayout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: loginImage, 
      alt: "First Image",
    },
    {
      src: ForgetImage,
      alt: "Second Image",
    },
    {
      src: registerImage,
      alt: "Third  Image",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="grid grid-cols-2 h-screen bg-gray-50 relative bg-[length:1386px_1064px] bg-right bg-no-repeat bg-auth-pattern">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-8 sm:px-10 lg:px-20 xl:px-24 bg-gray-200 z-index">
        <h1
          className="text-3xl font-bold block text-gray-900 fixed"
          style={{ top: "55px", left: "95px", fontSize: "50px" }}
        >
          <span className="dash">Dash</span>Stack
        </h1>
        <div className="relative w-3/4   mx-auto ">
          <div className=" rounded-lg ">
            <div className="w-full h-90 border">

            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className={`w-full h-96`}
            />
            </div>
          </div>
          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-7 rounded-lg ${
                  index === currentIndex ? "bg-orange-600" : "bg-orange-300 h-2 w-2 rounded-full"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col h-screen p-4 sm:p-6 lg:p-18 z-index">
        <div className="m-auto w-full overflow-auto max-w-md lg:max-w-lg login-background p-6 bg-white rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
