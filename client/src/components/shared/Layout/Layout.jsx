import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

import bgwave from "../../../assets/images/bg1.jpg";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);
  const isOpen = useSelector((state) => state.hamburger.isOpen);
  useEffect(() => {
    function handleScroll() {
      if (navbarRef.current) {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        if (window.scrollY > navbarHeight) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(scrolled);

  return (
    <div
      style={{
        backgroundImage: `url(${bgwave})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
      className=" h-screen"
    >
      <div
        ref={navbarRef}
        className={`header z-50 ${
          scrolled && "fixed w-full"
        } p-2 md:h-[15%] h-[10%]`}
      >
        <div className={`${scrolled && "border bg-black/25 border-gray-300 rounded-lg backdrop-blur-md "}`}>
          <Header />
        </div>
      </div>
      <div className="flex flex-1 h-[90%] md:h-[85%]">
        {/* Main Content */}
        <main
          className={`flex-1 ${
            isOpen && "blur-md md:blur-none overflow-hidden"
          } p-6 overflow-x-hidden`}
        >
          <Outlet />
        </main>
      </div>
      {/* footer */}
      <Footer/>
    </div>
  );
};

export default Layout;
