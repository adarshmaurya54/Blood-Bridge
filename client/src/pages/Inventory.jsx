import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa"; // Importing the Plus icon from react-icons
import Spinner from "../components/shared/Spinner";
import Modal from "../components/shared/Modal"; // Import your Modal component

const Inventory = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const inputFields = [
    {
      labelText: "Name",
      labelFor: "name",
      inputType: "text",
      name: "name",
      placeholder: "Enter your name"
    },
    {
      labelText: "Email",
      labelFor: "email",
      inputType: "email",
      name: "email",
      placeholder: "Enter your email"
    },
    {
      labelText: "Password",
      labelFor: "password",
      inputType: "password",
      name: "password",
      placeholder: "Enter your password"
    }
  ];

  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <Modal modalTitle={"Add Inventory"} buttonName={"Add Inventory"} inputFields={inputFields} buttonIcon={<FaPlus/>} />
    </>
  );
};

export default Inventory;
