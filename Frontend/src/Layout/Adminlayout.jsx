import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function AdminLayout({ role }) {
  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
