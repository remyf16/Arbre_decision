import React from "react";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex flex-col flex-1">
        <TopNav />
        <main className="flex-1 p-10 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
