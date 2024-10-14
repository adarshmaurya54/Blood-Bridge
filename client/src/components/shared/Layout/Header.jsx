import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiDonateBlood } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../../../assets/images/user/user.png";
import { IoIosLogOut } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { toggleHamburger } from "../../../redux/features/hamburger/hamburgerSlice";  
import { toast } from "react-toastify";

const Header = () => {
  const isOpen = useSelector((state) => state.hamburger.isOpen);  // Get hamburger state
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const paths = (() => {
    if (user?.role === "donor") {
      return ["/", "/organisation", "/donation"];
    } else if (user?.role === "hospital") {
      return ["/", "/organisation", "/consumer"];
    } else if (user?.role === "admin") {
      return ["/", "/donor-list", "/hospital-list", "/organisation-list"];
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
    <nav className="relative p-4 h-full flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* BloodBridge Title */}
          <Link to="/">
            <div className="text-lg font-bold flex items-center">
              <BiDonateBlood className="text-red-600 text-3xl" /> Blood Bridge
            </div>
          </Link>
          {/* Home NavLink */}
          {paths.map((path, index) => (
            <div className="hidden md:block" key={index}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white hover:shadow-md bg-black px-3 py-2 rounded-md text-sm font-medium"
                    : "text-black hover:shadow-md hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
              className="h-10 w-10 outline-black outline outline-offset-2 outline-1 rounded-full object-cover mr-2"
            />
            <div className="capitalize">
              Welcome,{" "}
              {user?.name || user?.hospitalName || user?.organisationName}
            </div>
            <div
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="text-xs px-3 capitalize bg-gray-200 text-gray-800 rounded-full"
            >
              {user?.role}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-white flex justify-center px-3 hover:shadow-md bg-black py-2 rounded-md text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <IoIosLogOut className="text-lg" />
              Logout
            </div>
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => dispatch(toggleHamburger())}  // Dispatch toggleHamburger action
            className="text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-2xl font-medium"
          >
            {isOpen ? <LiaTimesSolid /> : <RxHamburgerMenu />}  {/* Show appropriate icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute z-50 p-4 w-[100%] top-[70%] left-0">
          <div className="md:hidden bg-white p-2 border shadow-md mt-2 rounded-md">
            <div className="flex gap-1 flex-col">
              {paths.map((path, index) => (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-black px-3 py-2 rounded-md text-sm font-medium"
                      : "text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                  onClick={() => dispatch(toggleHamburger())}  // Close the menu when a link is clicked
                >
                  {path === "/"
                    ? "Home"
                    : path.substring(1).charAt(0).toUpperCase() +
                      path.substring(2)}
                </NavLink>
              ))}
            </div>
            <div className="flex flex-col cursor-pointer mt-4 space-y-4">
              <div className="flex gap-2 justify-between items-center">
                <img
                  src={userImage}
                  alt="User Avatar"
                  className="h-10 w-10 outline-black outline outline-offset-2 outline-1 rounded-full object-cover mr-2"
                />
                <div className="capitalize text-xs">
                  Welcome,{" "}
                  {user?.name || user?.hospitalName || user?.organisationName}
                </div>
                <div
                  style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                  className="text-xs px-3 capitalize bg-gray-200 text-gray-800 rounded-full"
                >
                  {user?.role}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-white flex justify-center px-3 hover:shadow-md bg-black py-2 rounded-md text-sm font-medium"
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
