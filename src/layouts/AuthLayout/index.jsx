import React from "react";
import { Outlet } from "react-router";
import loginImage from "../../assets/image/login.png";
import "../../assets/css/login/login.css";


export const AuthLayout = () => {
  return (
    <div className="grid grid-cols-2 h-screen bg-gray-50 relative  bg-[length:1386px_1064px] bg-right bg-no-repeat bg-auth-pattern">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-8 sm:px-10 lg:px-20 xl:px-24 bg-gray-200 z-index">
        <h1
          className="text-3xl font-bold block text-gray-900 fixed"
          style={{ top: "55px", left: "95px", fontSize: "50px" }}
        >
          <span className="dash">Dash</span>Stack
        </h1>
        <div>
          <img
            src={loginImage}
            alt="Society Management Illustration"
            className="w-full object-cover"
          />
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
