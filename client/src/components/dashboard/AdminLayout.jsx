import React, { useState } from "react";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <SideNav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <TopNav />
        <main className="flex-1 p-10 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
