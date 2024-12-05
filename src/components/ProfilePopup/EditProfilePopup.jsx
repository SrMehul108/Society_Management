import React, { useState, useEffect } from "react";
import { userUpdate } from "../../apis/api";

const EditProfilePopup = ({ profile, onClose, onUpdate }) => {
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  useEffect(() => {
    setUpdatedProfile(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const displayedFields = {
    fullName: updatedProfile.fullName,
    phoneNo: updatedProfile.phoneNo,
    email: updatedProfile.email,
    society: "AAyega", // If this should be dynamic, include it in the profile object
    country: updatedProfile.country,
    state: updatedProfile.state,
    city: updatedProfile.city,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await userUpdate(updatedProfile);
      onUpdate(updatedProfile);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full relative">
        <div>
          <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-[-10px] right-[-8px] text-black rounded-full p-2"
          >
            ✕
          </button>
        </div>

        {/* Edit Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
          <div className="flex justify-end">
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
  );
};

export default EditProfilePopup;
