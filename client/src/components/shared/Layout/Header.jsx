import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiDonateBlood } from "react-icons/bi";
import { useSelector } from "react-redux";
import userImage from "../../../assets/images/user/user.png";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  //function for capitalizing the name
  const capitalize = (str) => {
    if (!str) return ""; // Handle empty or undefined names
    return str
      .split(" ") // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join the words back together
  };

  // logout functionality
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* BloodBridge Title */}
          <div className="text-white text-lg font-bold flex items-center">
            <BiDonateBlood className="text-red-600 text-3xl" /> BloodBridge
          </div>
          {/* Home NavLink */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            Home
          </NavLink>
        </div>

        <div className="hidden md:flex cursor-pointer items-center space-x-4">
          <div className="text-white flex items-center">
            <img
              src={userImage}
              alt="User Avatar"
              className="h-10 w-10 outline-white outline outline-offset-2 outline-1 rounded-full object-cover mr-2" // Styling for rounded image
            />
            Welcome, {capitalize(user?.name)}
          </div>
          <button onClick={handleLogout} className="text-black px-3 bg-white py-2 rounded-md text-sm font-medium">
            Logout
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col mt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Home
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
