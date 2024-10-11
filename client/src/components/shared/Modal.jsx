import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import InputType from "./Form/InputType";

const Modal = ({modalTitle, buttonName, buttonIcon}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={toggleModal}
        className="px-4 py-2 text-white flex gap-2 items-center bg-black rounded-md"
      >
        {buttonIcon}
        {buttonName}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black backdrop-blur-sm bg-opacity-50">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-lg shadow-lg">
            {/* Close button */}
            <button
              onClick={toggleModal}
              className="absolute text-xl top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>

            {/* Modal header */}
            <div className="mb-4 text-lg font-bold text-center">
              {modalTitle}
            </div>

            {/* Modal body (Form) */}
            <form className="space-y-4">
              {/* Name Field */}
              <InputType
                    labelText="Name"
                    labelFor="name"
                    inputType="text"
                    name="name"
                    placeholder="Enter your name"
                  />

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 mt-1 border  rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your password"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
