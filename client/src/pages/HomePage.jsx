import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import blooddonation from "../assets/images/blood-donation.png";
import Modal from "../components/shared/Modal";

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <main className="container mx-auto flex flex-col lg:flex-row justify-between items-center md:py-12 md:px-6 lg:px-12">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl font-extrabold text-gray-800">
            Everywhere For Everyone
          </h2>
          <p className="text-lg text-gray-600">
            Give blood, give life. Your donation can make a big difference in
            someone's life.
          </p>
          <div className="space-x-4">
            <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-300">
              Read More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <img
            src={blooddonation} // Use the actual image path or URL
            alt="Blood donation illustration"
            className="w-full max-w-xl"
          />
        </div>
      </main>
    </>
  );
};

export default HomePage;
