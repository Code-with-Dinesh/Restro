import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
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

  

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 p-4">
        <div className="text-2xl font-bold text-orange-400">
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
        className={`bg-gray-900 text-white min-h-screen flex flex-col fixed md:relative top-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 text-2xl font-bold text-orange-400 hidden md:block">
          {role === "admin" ? "Admin Panel" : "User Panel"}
        </div>
        <nav className="flex-1 mt-4 md:mt-0">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)} // close sidebar on mobile click
              className={({ isActive }) =>
                `block px-6 py-3 hover:bg-gray-800 ${
                  isActive ? "bg-gray-800 text-orange-400 font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
         <Link
  to="/"
  className="mt-4 mx-4 block w-full md:inline-block md:w-auto text-center bg-gray-900 hover:border-1 hover:border-white text-white font-medium rounded-lg px-6 py-2 transition-all duration-200 shadow-md hover:shadow-lg"
>
  Go Back
</Link>

        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
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
