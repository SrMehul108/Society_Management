import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import EditProfilePopup from "./EditProfilePopup";

const ProfilePage = () => {
  const location = useLocation(); // Access location state
  const { profileData } = location.state || {}; // Destructure profileData

  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(profileData);

  // Debugging: Check if data is received correctly
  console.log("Received Profile Data:", profileData);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsOpen(false);
  };

  if (!profile) {
    return <div>No profile data available. Please try again.</div>;
  }

  const displayedFields = {
    firstName: profile.fullName,
    phoneNumber: profile.phoneNo,
    email: profile.email,
    society: profile.society || "Not available", // Example fallback
    country: profile.country,
    state: profile.state,
    city: profile.city,
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div className="rounded-lg shadow-xl p-6 max-w-4xl w-full relative bg-slate-50">
        <div className="flex justify-between mb-4">
          <h2>Profile</h2>
          <button
            onClick={handleOpen}
            className="px-6 py-3 bg-orange-500 text-white rounded-md shadow-lg hover:bg-orange-600 transition"
          >
            Edit Profile
          </button>
          {isOpen && (
            <EditProfilePopup
              profile={profile}
              onClose={handleClose}
              onUpdate={handleUpdateProfile}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row bg-white rounded-lg">
          <div className="flex flex-col items-center justify-center border-r md:w-1/3 p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-full w-24 h-24"
            />
            <h2 className="text-xl font-semibold mt-4">
              {profile.firstName} {profile.lastName}
            </h2>
          </div>
          <div className="md:w-2/3 p-4">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(displayedFields).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-orange-300"
                    value={value || ""}
                    readOnly
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
