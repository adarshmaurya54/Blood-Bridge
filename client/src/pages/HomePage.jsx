import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import blooddonation from "../assets/images/blood-donation.jpg";

const HomePage = () => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <main className="container mx-auto flex flex-col lg:flex-row justify-between items-center md:px-12 md:pt-5">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl font-extrabold md:leading-none leading-[60px] text-gray-800">
            Everywhere For Everyone
          </h2>
          <p className="text-lg text-gray-600">
            Give blood, give life. Your donation can make a big difference in
            someone's life.
          </p>
          <div className="space-x-4">
            <button
              type="button"
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Read More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <img
            src={blooddonation} // Use the actual image path or URL
            alt="Blood donation illustration"
            className="w-full rounded-lg border shadow-lg max-w-xl"
          />
        </div>
      </main>
    </>
  );
};

export default HomePage;
