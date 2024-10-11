import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="header h-[15%]">
        <Header />
      </div>
      <div className="flex flex-1 h-[85%]">
        
        {/* Main Content */}
        <main className="flex-1 bg-white p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;
