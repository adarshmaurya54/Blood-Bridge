import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
  const isOpen = useSelector((state) => state.hamburger.isOpen);
  return (
    <footer className={`bg-transparent w-full relative mx-auto pb-3 px-8 ${isOpen && "blur-md select-none md:blur-0"}`}>
      <span className="block text-sm border-t dark:border-gray-500 border-gray-200 pt-2 text-gray-500 text-center dark:text-gray-400">
        © 2024{" "}
        <Link to="/" className="hover:underline">
          Blood Bridge
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;
