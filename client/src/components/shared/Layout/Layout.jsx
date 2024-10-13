import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

import bgwave from "../../../assets/images/bg1.jpg"

const Layout = () => {
  return (
    <div style={{backgroundImage: `url(${bgwave})`, backgroundSize: "cover"}} className=" h-screen">
      <div className="header h-[15%]">
        <Header />
      </div>
      <div className="flex flex-1 h-[85%]">
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;
