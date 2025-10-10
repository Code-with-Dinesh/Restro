import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({ role }) {
  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      {/* Sidebar */}
      <div className="h-screen sticky top-0 z-50">
        <Sidebar role={role} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          <Outlet role={role} />
        </div>
      </div>
    </div>
  );
}
