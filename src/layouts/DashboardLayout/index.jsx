import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { DSSidebar } from "@/components";
import { Icons } from "../../constants";
import Notification from "../../components/Notification/Notification";
import { LoginData } from "../../apis/api";
import { io } from 'socket.io-client';


const socket = io('https://society-management-4z4w.onrender.com');

export const DashboardLayout = ({ items, Data }) => {
  const [notifications, setNotifications] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (profileData) {
      navigate("/admin/profile", { state: { profileData } });
    } else {
      console.error("Profile data is not available!");
    }
  };


  const fetchProfileData = async () => {
    try {
      const response = await LoginData();
      setProfileData(response);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };


  const addNotification = (message, type = "info") => {
    const newNotification = {
      id: Date.now(),
      notificationMessage: message,
      notificationType: type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  useEffect(() => {
    fetchProfileData();
    socket.on("new-notification", (data) => {
      addNotification(data.message, data.type);
    });

    if (socket) {
      const societyId = LoginData();
      const SocId = societyId.societyId;
      socket.emit('join-society', SocId); 
    }

    return () => {
      socket.off("new-notification");
    };
  }, [socket]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id)); 
  };

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

      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col pl-0 md:pl-64 flex-auto min-h-0">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 px-4">
            <label className="flex items-center gap-2 bg-gray-300 w-full max-w-[400px] rounded-lg p-2">
              <input
                type="text"
                className="grow bg-gray-300 focus:outline-none"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </label>
          </div>

          {/* Notifications and Profile */}
          <div className="flex items-center gap-4">
            {/* Notification Button */}
            <button
              onClick={() => addNotification("New notification", "info")}
              className="p-2 border rounded-lg hover:bg-gray-100"
            >
              {Icons.Bell}
            </button>

            {/* Display Notifications */}
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                message={notification.notificationMessage}
                type={notification.notificationType}
                onClose={() => removeNotification(notification.id)}
              />
            ))}

            {/* Profile Section */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleProfileClick}
            >
              <img
                src="/placeholder.svg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full border"
              />
              <span>{profileData?.fullName || "Loading..."}</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main
          className="flex-1 p-4 overflow-y-auto max-h-screen"
          style={{ backgroundColor: "#f0f5fb" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
