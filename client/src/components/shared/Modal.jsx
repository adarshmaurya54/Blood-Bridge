import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import InputType from "./Form/InputType";
import API from "../../services/API";
import { toast } from "react-toastify";

const Modal = ({ modalTitle, buttonName, buttonIcon, getBloodReacords }) => {
  const [showModal, setShowModal] = useState(false);
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  // Handle Modal toggle
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle Modal form submission
  const handleModalSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Placeholder for form submission logic (API call, etc.)
    try {
      if (!bloodGroup || !quantity || !email) {
        return alert("Please Provide All Fields");
      }

      // Placeholder for API call
      const { data } = await API.post("/inventory/create-inventory", {
        email: user?.email,
        donorEmail: email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });

      if (data?.success) {
        toast.success("New inventory created successfully.");
        getBloodReacords();
        setShowModal(false);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          toast.error(error.response.data.message); // 500 error toast
        }
      }
      // console.log();
    }
  };

  // Change email label based on inventory type
  var emailLabel = "Hospital Email";
  if (inventoryType === "in") {
    emailLabel = "Donor Email";
  }

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
              {modalTitle || "Manage Blood Record"}
            </div>

            {/* Modal body (Form) */}
            <form onSubmit={handleModalSubmit} className="space-y-4">
              {/* Inventory Type Selection */}
              <div className="flex items-center">
                <p className="font-bold">Blood Type: &nbsp;</p>
                <div className="form-check flex items-center gap-3">
                  <input
                    type="radio"
                    name="inventoryType"
                    value="in"
                    id="in"
                    className="form-check-input"
                    defaultChecked
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="in" className="form-check-label">
                    IN
                  </label>

                  <input
                    type="radio"
                    name="inventoryType"
                    value="out"
                    id="out"
                    className="form-check-input"
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="out" className="form-check-label">
                    OUT
                  </label>
                </div>
              </div>

              {/* Blood Group Selection */}
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                aria-label="Select Blood Group"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">Select Blood Group</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
              </select>

              {/* Email Input */}
              <InputType
                labelText={emailLabel}
                labelFor="email"
                inputType="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Quantity Input */}
              <InputType
                labelText="Quantity (ML)"
                labelFor="quantity"
                inputType="number"
                value={quantity}
                placeholder="Enter Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
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
