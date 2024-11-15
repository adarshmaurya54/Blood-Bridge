import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

import bgwave from "../../../assets/images/bg1.jpg"
import { useSelector } from "react-redux";

const Layout = () => {
  const isOpen = useSelector(state => state.hamburger.isOpen)
  return (
    <div style={{backgroundImage: `url(${bgwave})`, backgroundSize: "cover"}} className=" h-screen">
      <div className="header p-5 md:h-[15%] h-[10%]">
        <Header />
      </div>
      <div className="flex flex-1 h-[90%] md:h-[85%]">
        
        {/* Main Content */}
        <main className={`flex-1 ${isOpen && "blur-md overflow-hidden"} p-6 overflow-x-hidden`}>
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;