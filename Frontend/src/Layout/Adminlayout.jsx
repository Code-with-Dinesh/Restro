import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


export default function AdminLayout({ role }) {
    
  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      
      <div className="h-screen sticky top-0">
        <Sidebar role={role} />
      </div>

    
      <div className="flex-1 flex flex-col">
       
        <div className="flex-1 overflow-auto p-6">
          <Outlet role={role} />
        </div>

       
      </div>
    </div>
  );
}
