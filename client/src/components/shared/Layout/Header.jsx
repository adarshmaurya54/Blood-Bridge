import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiDonateBlood } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../../../assets/images/user/defaultUserDP.gif";
import { IoIosLogOut } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { toggleHamburger } from "../../../redux/features/hamburger/hamburgerSlice";
import { toast } from "react-toastify";
import {
  lightTheme,
  darkTheme,
} from "../../../redux/features/Theme/themeSlice";

const Header = () => {
  const isOpen = useSelector((state) => state.hamburger.isOpen); // Get hamburger state
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Access current theme state

  // Update the <html> class when the theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]); // Runs whenever `isDarkMode` changes

  const handleLightTheme = () => {
    dispatch(lightTheme()); // Dispatch the light theme action
  };

  const handleDarkTheme = () => {
    dispatch(darkTheme()); // Dispatch the dark theme action
  };

  const paths = (() => {
    if (user?.role === "donor") {
      return ["/", "/organisation", "/donation"];
    } else if (user?.role === "hospital") {
      return ["/", "/organisation", "/consumer"];
    } else if (user?.role === "admin") {
      return ["/", "/donor-list", "/hospital-list", "/organisation-list", "/inventories"];
    } else if (user?.role === "organisation") {
      return ["/", "/analytics", "/inventory", "/donor", "/hospital"];
    } else {
      return ["/"];
    }
  })();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  return (
    <nav className="relative py-4 h-full flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* BloodBridge Title */}
          <Link to="/">
            <div className="md:text-xl transition-all font-bold flex items-center">
              <BiDonateBlood className="text-red-600 transition-all md:text-4xl text-3xl" />
              <span className="dark:text-white">Blood Bridge</span>
            </div>
          </Link>
          {/* Home NavLink */}
          {paths.map((path, index) => (
            <div className="hidden md:block" key={index}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "dark:text-black text-white hover:shadow-md dark:bg-white bg-black px-3 py-2 rounded-xl text-sm font-medium"
                    : "dark:text-white text-black hover:shadow-md hover:bg-black hover:dark:bg-white hover:dark:text-black hover:text-white px-3 py-2 rounded-xl text-sm font-medium"
                }
              >
                {path === "/"
                  ? "Home"
                  : path === "/donor-list"
                  ? "Donor List"
                  : path === "/hospital-list"
                  ? "Hospital List"
                  : path === "/organisation-list"
                  ? "Organisation List"
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
              className="h-11 w-11 rounded-full object-cover mr-2"
            />
            <div className="capitalize dark:text-white">
              Welcome,{" "}
              {user?.name || user?.hospitalName || user?.organisationName}
            </div>
            <div
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="text-xs px-3 capitalize bg-gray-200 text-gray-800 rounded-full"
            >
              {user?.role}
            </div>
            <svg
              onClick={() => handleDarkTheme()}
              className="w-7 h-7 dark:hidden cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                className="stroke-black"
              ></path>
              <path
                d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                className="stroke-black"
              ></path>
            </svg>
            <svg
              onClick={() => handleLightTheme()}
              className="w-7 h-7 hidden dark:block cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                className=""
              ></path>
              <path
                d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                className="fill-black dark:fill-white"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                className="fill-black dark:fill-white"
              ></path>
            </svg>
          </div>
          <button
            onClick={handleLogout}
            className="dark:text-black text-white flex justify-center px-3 hover:shadow-md dark:bg-white bg-black py-2 rounded-xl text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <IoIosLogOut className="text-lg" />
              Logout
            </div>
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => dispatch(toggleHamburger())} // Dispatch toggleHamburger action
            className="dark:text-white text-black dark:hover:text-black dark:hover:bg-white hover:bg-black hover:text-white px-3 py-2 rounded-xl text-2xl font-medium"
          >
            {isOpen ? <LiaTimesSolid /> : <RxHamburgerMenu />}{" "}
            {/* Show appropriate icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute z-50 py-4 w-[104%] top-[87%] left-[-8px]">
          <div className="md:hidden dark:bg-black/60 bg-white/60 p-1 border-[1.5px] border-gray-400 dark:border-gray-500 shadow-md mt-2 rounded-[1rem]">
            <div className="flex gap-1 flex-col">
              {paths.map((path, index) => (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "dark:text-black text-white dark:bg-white bg-black px-3 py-2 rounded-xl text-sm font-medium"
                      : "dark:text-white text-black hover:bg-black hover:dark:bg-white hover:text-white hover:dark:text-black px-3 py-2 rounded-xl text-sm font-medium"
                  }
                  onClick={() => dispatch(toggleHamburger())} // Close the menu when a link is clicked
                >
                  {path === "/"
                    ? "Home"
                    : path.substring(1).charAt(0).toUpperCase() +
                      path.substring(2)}
                </NavLink>
              ))}
            </div>
            <div className="flex flex-col cursor-pointer mt-4 space-y-4">
              <div className="flex gap-2 px-1 justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={userImage}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover mr-2"
                  />
                  <div className="capitalize dark:text-white text-xs">
                    Welcome,{" "}
                    {user?.name || user?.hospitalName || user?.organisationName}
                  </div>
                </div>
                <div
                  style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                  className="text-xs px-3 capitalize bg-gray-200 text-gray-800 rounded-full"
                >
                  {user?.role}
                </div>
              </div>
              <div className="px-1">
                <svg
                  onClick={() => handleDarkTheme()}
                  className="w-7 h-7 dark:hidden cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    className="stroke-black"
                  ></path>
                  <path
                    d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                    className="stroke-black"
                  ></path>
                </svg>
                <svg
                  onClick={() => handleLightTheme()}
                  className="w-7 h-7 hidden dark:block cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                    className=""
                  ></path>
                  <path
                    d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                    className="fill-black dark:fill-white"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                    className="fill-black dark:fill-white"
                  ></path>
                </svg>
              </div>
              <button
                onClick={handleLogout}
                className="dark:text-black text-white flex justify-center px-3 hover:shadow-md dark:bg-white bg-black py-2 rounded-xl text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  <IoIosLogOut className="text-lg" />
                  Logout
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
