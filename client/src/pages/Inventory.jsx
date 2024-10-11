import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa"; // Importing the Plus icon from react-icons
import Spinner from "../components/shared/Spinner";
import Modal from "../components/shared/Modal"; // Import your Modal component

const Inventory = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleAddInventory = () => {
    setShowModal(true); // Show the modal when the button is clicked
  };

  const toggleModal = () => {
    setShowModal(!showModal); // Toggle modal visibility
  };

  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <Modal modalTitle={"Add Inventory"} buttonName={"Add Inventory"} buttonIcon={<FaPlus/>} />
    </>
  );
};

export default Inventory;
