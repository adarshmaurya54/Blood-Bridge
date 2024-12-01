import React, { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import blooddonation from "../assets/images/blood-donation.jpg";
import { LiaTimesSolid } from "react-icons/lia";

const HomePage = () => {
  const { loading } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <main className="container mx-auto flex flex-col lg:flex-row justify-between items-center md:px-12 md:pt-5">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl font-extrabold md:leading-none leading-[60px] dark:text-white text-gray-800">
            Everywhere For Everyone
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Give blood, give life. Your donation can make a big difference in
            someone's life.
          </p>
          <div className="space-x-4">
            <button
              type="button"
              className="dark:text-gray-400 text-gray-900 hover:text-white border dark:border-gray-500 border-gray-800 hover:bg-gray-900 hover:dark:bg-white hover:dark:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleOpenModal}
            >
              Read More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <img
            src={blooddonation}
            alt="Blood donation illustration"
            className="w-full rounded-lg border shadow-lg max-w-xl"
          />
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-slate-900 dark:border-gray-700 dark:border-2 relative rounded-xl shadow-lg p-6 lg:w-[60%] md:w-[70%] md:h-[70%] w-[80%] h-[80%] lg:h-[60%] transition-all duration-300">
            <div className="flex justify-between mb-4 items-center">
              <h3 className="text-4xl font-bold dark:text-white">
                Why Donate Blood?
              </h3>
              <div className="flexitems-center">
                <button
                  type="button"
                  className="dark:bg-white dark:text-black text-white bg-black p-2 rounded-xl hover:bg-red-700"
                  onClick={handleCloseModal}
                >
                  <LiaTimesSolid />
                </button>
              </div>
            </div>
            <p className="dark:text-gray-100 text-gray-600 mb-6 text-xl">
              Blood donation is a vital process that saves millions of lives
              every year. By donating, you can help individuals undergoing
              surgery, cancer treatment, or those recovering from severe
              injuries. One pint of blood can save up to three lives!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
