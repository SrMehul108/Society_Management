import React, { useState } from "react";
import { Outlet } from "react-router";
import { DSSidebar } from "@/components";
import { Icons } from "../../constants";
import Notification from "../../components/Notification/Notification";
import ProfilePopup from "../../components/ProfilePopup/ProfilePopup";

export const DashboardLayout = ({ items }) => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationType, setNotificationType] = useState("success");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for sidebar toggle
  const [searchValue, setSearchValue] = useState(""); // Controlled input state
  const [isOpen, setIsOpen] = useState(false); // Profile popup state

  const handleButtonClick = () => {
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        notificationMessage: "This is a notification!",
        notificationType: "success",
      },
    ]);
    setIsNotificationVisible(true);
  };

  const handleCloseNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    if (notifications.length <= 1) setIsNotificationVisible(false);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex h-screen overflow-y-auto">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:w-64`}
      >
        <DSSidebar items={items} />
      </div>

      {/* Overlay for mobile sidebar */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col pl-0 md:pl-64 flex-auto min-h-0">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between md:justify-between flex-[0_0_auto]">
          {/* Search Bar */}
          <div className="flex-1 px-4">
            <label className="flex items-center gap-2 bg-gray-300 w-full max-w-[400px] rounded-lg p-2">
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
                className="grow bg-gray-300 focus:outline-none"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </label>
          </div>

          {/* Notifications and User Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications Button */}
            <button
              onClick={handleButtonClick}
              className="p-2 border rounded-lg hover:bg-gray-100"
              title="View Notifications"
              aria-label="View Notifications"
            >
              {Icons.Bell}
            </button>
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                isVisible={isNotificationVisible}
                message={notification.notificationMessage}
                type={notification.notificationType}
                onClose={() => handleCloseNotification(notification.id)}
              />
            ))}

            {/* Profile Section */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleOpen}
              title="View Profile"
              aria-label="View Profile"
            >
              <img
                src="/placeholder.svg"
                alt="User"
                className="w-8 h-8 rounded-full border"
              />
              <span className="hidden sm:block">Moni Roy</span>
            </div>

            {/* Profile Popup */}
            {isOpen && <ProfilePopup onClose={handleClose} />}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto max-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
