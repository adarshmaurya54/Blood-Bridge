import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);
  const containerRef = useRef(null); // Reference for the scrollable container
  const isOpen = useSelector((state) => state.hamburger.isOpen); // getting the current state of the hamburger

  useEffect(() => {
    function handleScroll() {
      if (navbarRef.current && containerRef.current) {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        const scrollTop = containerRef.current.scrollTop; // Get scroll position of parent div
        if (scrollTop > navbarHeight) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    }

    const scrollableElement = containerRef.current;

    // Add scroll event listener to the container
    scrollableElement.addEventListener("scroll", handleScroll);
    return () => {
      // Remove scroll event listener from the container
      scrollableElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef} // Attach the ref to the scrollable container
      style={{ backgroundSize: "cover" }}
      className={`bg-[url(/src/assets/images/bg_light.jpg)] bg-fixed overflow-auto ${isOpen && "overflow-hidden"} dark:bg-[url(/src/assets/images/bg_dark.jpg)] h-screen`}
    >
      <div
        ref={navbarRef}
        className={`header ${
          scrolled
            ? "fixed z-50 w-[100%] md:w-[98.8%] md:px-4 px-2 py-2 transition-all duration-400"
            : "px-5"
        }`}
      >
        <div
          className={`${
            scrolled &&
            "dark:bg-black/50 bg-white/70 border border-gray-400 dark:border-gray-500 rounded-[1rem] backdrop-blur-md px-2"
          }`}
        >
          <Header />
        </div>
      </div>
      <div className="flex flex-1">
        {/* Main Content */}
        <main
          className={`flex-1 ${
            isOpen && "blur-md pointer-events-none md:blur-0 select-none overflow-hidden"
          } md:p-6 p-4 overflow-x-hidden`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
