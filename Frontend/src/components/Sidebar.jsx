import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = ({role}) => {
    const adminLinks = [
    {name:"Dashboard",path:"/admin/dashboard"},
    {name:"Users" ,path:"/admin/users"},
    { name: "Restaurant Items", path: "/admin/restaurant-items" }, 
    { name: "Orders", path: "/admin/orders" }, 
    ]
    const userLinks = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "My Orders", path: "/user/orders" }, 
    { name: "Settings", path: "/user/settings" },
    ]

    const links = role === 'admin'?adminLinks:userLinks;
 return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold text-orange-400">
        {role === "admin" ? "Admin Panel" : "User Panel"}
      </div>
      <nav className="flex-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-6 py-3 hover:bg-gray-800 ${
                isActive ? "bg-gray-800 text-orange-400 font-semibold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar