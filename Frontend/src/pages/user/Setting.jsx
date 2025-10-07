import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaEdit } from "react-icons/fa";
import { userApi } from "../../api/productapi";

const Setting = () => {
  const [user, setUser] = useState(null);

  const handleToggleNotifications = () => {
    setUser((prev) => ({ ...prev, notifications: !prev.notifications }));
  };

  const handlerUserProfile = async () => {
    try {
      const result = await userApi();
      setUser(result.data); // assuming API response: { success:true, data: {...} }
    } catch (err) {
      console.log("Error fetching user profile", err);
    }
  };

  useEffect(() => {
    handlerUserProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Loading user profile...
      </div>
    );
  }

  // Default avatar SVG
  const defaultAvatar = (
    <svg
      className="w-24 h-24 text-orange-400"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
      />
    </svg>
  );

  // Helper to choose icon based on field
  const renderIcon = (field) => {
    switch (field) {
      case "email":
        return <FaEnvelope className="text-orange-400" />;
      case "phone":
        return <FaPhoneAlt className="text-orange-400" />;
      case "address":
        return <FaMapMarkerAlt className="text-orange-400" />;
      case "role":
        return <FaUser className="text-orange-400" />;
      default:
        return <FaUser className="text-orange-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4 sm:px-8">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-8 text-center">
          👤 User Settings
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border-b border-gray-700 pb-6">
          {user.avatar || user.image ? (
            <img
              src={user.avatar || user.image}
              alt="User Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-orange-400"
            />
          ) : (
            <div className="w-28 h-28 border-4 border-orange-400 rounded-full flex items-center justify-center">
              {defaultAvatar}
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold">{user.name || "No Name"}</h2>
            <p className="text-gray-400 mt-1">Role: {user.role || "User"}</p>
            <button className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-sm rounded-lg transition flex items-center gap-2 mx-auto sm:mx-0">
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>

        {/* User Info Section */}
        <div className="space-y-4 text-gray-300">
          {user.email && (
            <div className="flex items-center gap-3">
              {renderIcon("email")}
              <span>{user.email}</span>
            </div>
          )}
          {user.phone && (
            <div className="flex items-center gap-3">
              {renderIcon("phone")}
              <span>{user.phone}</span>
            </div>
          )}
          {user.address && (
            <div className="flex items-center gap-3">
              {renderIcon("address")}
              <span>{user.address}</span>
            </div>
          )}
        </div>

        {/* Notification Toggle */}
        <div className="mt-8 flex items-center justify-between bg-gray-700 p-4 rounded-xl">
          <p className="text-lg font-medium">Notifications</p>
          <button
            onClick={handleToggleNotifications}
            className={`w-14 h-7 rounded-full flex items-center transition-all duration-300 ${
              user.notifications ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            <span
              className={`h-6 w-6 bg-white rounded-full transform transition-transform duration-300 ${
                user.notifications ? "translate-x-7" : "translate-x-1"
              }`}
            ></span>
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-10 text-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg font-medium shadow-lg transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
