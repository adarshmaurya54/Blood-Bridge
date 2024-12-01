import React from "react";
import { Link } from "react-router-dom";
import _404 from "../assets/images/404/404.jpg";

const PageNotFound = () => {
  return (
    <div className="min-h-screen relative ">
      <img src={_404} alt="404" className="absolute blur-xl top-0 left-0 w-full h-full object-cover z-1" />
      <div className="h-screen border relative flex flex-col items-center justify-center">
        <h1 className="text-9xl font-extrabold text-red-500 tracking-widest">
          404
        </h1>

        <div className="mt-5 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Oops! Something's missing.
          </h2>
          <p className="text-gray-700 mt-3">
            Sorry, we can't find the page you're looking for.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors duration-300"
          >
            Go back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
