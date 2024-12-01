import React from "react";
import banner2 from "../../assets/images/banner2.png";
import Form from "../../components/shared/Form/Form";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";

function Register() {
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading && (
          <Spinner message="Please wait..." />
      )}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side - Image */}
        <div className="hidden md:block md:w-1/3">
          <img
            src={banner2}
            alt="loginImage"
            className="w-full h-full object-contain"
          />
        </div>
        {/* Right Side - Form */}
        <div className="flex overflow-auto md:pt-0 pt-0 flex-col justify-center items-center md:w-2/3 bg-blue-100 p-2 md:h-auto h-full">
          <Form
            submitBtn="Register"
            formType="register"
            formTitle="Register Page"
          />
        </div>
      </div>
    </>
  );
}

export default Register;
