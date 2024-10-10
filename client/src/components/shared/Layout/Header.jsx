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

  // Function for capitalizing the name
  const capitalize = (str) => {
    if (!str) return ""; // Handle empty or undefined names
    return str
      .split(" ") // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join the words back together
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle menu state
  };

  return (
    <nav className="bg-white relative p-4 h-full flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* BloodBridge Title */}
          <div className="text-lg font-bold flex items-center">
            <BiDonateBlood className="text-red-600 text-3xl" /> BloodBridge
          </div>
          {/* Home NavLink */}
          {["/", "/inventory", "/donor", "/hospital"].map((path, index) => (
            <div className="hidden md:block" key={index}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-black px-3 py-2 rounded-md text-sm font-medium"
                    : "text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                {path === "/"
                  ? "Home"
                  : path.substring(1).charAt(0).toUpperCase() +
                    path.substring(2)}
              </NavLink>
            </div>
          ))}
        </div>

        <div className="hidden md:flex cursor-pointer items-center space-x-4">
          <div className="flex gap-3 items-center">
            <img
              src={userImage}
              alt="User Avatar"
              className="h-10 w-10 outline-red-600 outline outline-offset-2 outline-1 rounded-full object-cover mr-2" // Styling for rounded image
            />
            Welcome,{" "}
            {capitalize(
              user?.name || user?.hospitalName || user?.organisationName
            )}
            <div
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="text-xs px-3 bg-gray-200 text-gray-800 rounded-full"
            >
              {capitalize(user?.role)}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-white px-3 bg-black py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute p-4 w-[100%] top-[70%] left-0">
          <div className="md:hidden bg-white p-2 border shadow-md mt-2 rounded">
            <div className="flex gap-1 flex-col">
              {["/", "/inventory", "/donor", "/hospital"].map((path, index) => (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-black px-3 py-2 rounded-md text-sm font-medium"
                      : "text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                  onClick={() => setIsOpen(false)} // Close the menu on link click
                >
                  {path === "/"
                    ? "Home"
                    : path.substring(1).charAt(0).toUpperCase() +
                      path.substring(2)}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
