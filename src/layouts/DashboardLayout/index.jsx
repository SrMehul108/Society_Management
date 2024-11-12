import React from "react";
import { Outlet } from "react-router";
import { DSSidebar } from "@/components";
import { Icons } from "../../constants";

export const DashboardLayout = ({ items }) => {
  return (
    <div className="flex  min-h-screen">
      <DSSidebar items={items} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex-1 px-4 ">
            <label className="input bg-gray-300 w-80 input-bordered flex items-center gap-4 rounded-lg p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                className="grow bg-gray-300"
                placeholder="Search"
              />
            </label>
          </div>
          <div className="flex items-center gap-4">
            <div className="border p-2 rounded-lg">{Icons.Bell}</div>
            <div className="flex">
              <img
                src="/placeholder.svg"
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>Moni Roy</span>
            </div>
          </div>
          
        </header>

        {/* Main content area for the Outlet */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
