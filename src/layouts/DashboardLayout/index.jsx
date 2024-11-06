import React from "react";
import { Outlet } from "react-router";
import { DSSidebar } from "@/components";

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
          <div className="flex-1 px-4">
            <input
              type="text"
              placeholder="Search Here"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex items-center">
            <img
              src="/placeholder.svg"
              alt="User"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>Moni Roy</span>
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
