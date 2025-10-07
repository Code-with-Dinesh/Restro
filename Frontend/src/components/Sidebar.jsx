import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // listen to route changes

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Category", path: "/admin/category" },
    { name: "Restaurant Items", path: "/admin/restaurant-items" },
    { name: "Orders", path: "/admin/orders" },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/user" },
    { name: "My Orders", path: "/user/orders" },
    { name: "Settings", path: "/user/settings" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Hamburger Header */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 p-4 shadow-md">
        <div className="text-2xl font-bold text-orange-400 truncate">
          {role === "admin" ? "Admin Panel" : "User Panel"}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-3xl focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white fixed md:relative top-0 left-0 z-50 w-64 min-h-screen flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 text-2xl font-bold text-orange-400 hidden md:block">
          {role === "admin" ? "Admin Panel" : "User Panel"}
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 md:mt-0 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-6 py-3 md:px-4 md:py-2 hover:bg-gray-800 transition-colors duration-200 rounded-md mx-2 my-1 ${
                  isActive ? "bg-gray-800 text-orange-400 font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Go Back Button */}
          <Link
            to="/"
            className="mt-6 mx-4 block w-[calc(100%-2rem)] md:w-auto text-center bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Go Back
          </Link>
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
