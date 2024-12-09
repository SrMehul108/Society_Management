import React, { useState, useEffect } from "react";
import { userUpdate } from "../../apis/api";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData } = location.state || {}; // Get profile data from navigation state

  const [updatedProfile, setUpdatedProfile] = useState(profileData || {}); // Default to profileData or empty object

  useEffect(() => {
    if (profileData) {
      setUpdatedProfile(profileData); // Update state when profileData changes
    }
  }, [profileData]);

  if (!profileData) {
    return <div>No profile data available. Please try again.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value }); // Update individual fields
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userUpdate(updatedProfile);
      
      navigate(-1, { state: { profileData: updatedProfile } }); // Navigate back with updated profile
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const ProfileName = {
    fullName: updatedProfile.fullName || "",
   
  };
  const displayedFields = {
    fullName: updatedProfile.fullName || "",
    phoneNo: updatedProfile.phoneNo || "",
    email: updatedProfile.email || "",
    society: updatedProfile.society || "Not available", // Fallback if no data
    country: updatedProfile.country || "",
    state: updatedProfile.state || "",
    city: updatedProfile.city || "",
  };

  return (
    
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white rounded-lg  p-6 max-w-4xl w-full">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

        {/* Edit Profile Form */}
        <div className="flex">
        <div className="flex flex-col items-center justify-center border-r md:w-1/3 p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-full w-24 h-24"
            />
            <h2 className="text-xl font-semibold mt-4">
            {Object.entries(ProfileName).map(([key, value]) => (
                <div key={key}>{updatedProfile.fullName}</div>
              ))}
            </h2>
          </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-3"
        >
           
          {Object.entries(displayedFields).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-orange-300"
              />
            </div>
          ))}
          <div className="flex justify-end col-span-2">
            <button
              type="submit"
              className="mt-5 px-6 py-3 bg-orange-500 text-white rounded-md shadow-lg hover:bg-orange-600 transition"
            >
              Update Profile
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
