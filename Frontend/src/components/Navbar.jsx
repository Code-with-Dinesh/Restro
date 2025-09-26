import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authstore";
import axiosInstance from "../api/axiosinstance";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const  isAuthenticated = useAuthStore((state)=>state.isAuthenticated)
  const clearUser = useAuthStore((state)=>state.clearUser)
  console.log(isAuthenticated,clearUser)
  const removHandler = async () => {
    try {
      const res = await axiosInstance.post("/logout", {}, { withCredentials: true });
      console.log(res.data);
      clearUser();
       const state = useAuthStore.getState();
        console.log("After logout:", state);
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-orange-400">
            RestoHub
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <Link to="/menu" className="hover:text-orange-400">Menu</Link>

          {isAuthenticated ? (
            <button
              onClick={removHandler}
              className="bg-red-500 px-3 py-2 rounded-xl cursor-pointer hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-orange-500 px-3 py-2 rounded-xl hover:bg-orange-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 px-3 py-2 rounded-xl hover:bg-green-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-gray-800">
          <Link to="/" className="block hover:text-orange-400">Home</Link>
          <Link to="/menu" className="block hover:text-orange-400">Menu</Link>

          {isAuthenticated ? (
            <button
              onClick={removHandler}
              className="w-full text-left bg-red-500 px-3 py-2 rounded-xl hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block bg-orange-500 px-3 py-2 rounded-xl hover:bg-orange-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-green-500 px-3 py-2 rounded-xl hover:bg-green-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
