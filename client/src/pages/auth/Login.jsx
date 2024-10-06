import { useState } from "react";
import banner1 from "../../assets/images/banner1.jpg";
import Form from "../../components/shared/Form/Form";

const Login = ({ error, loading }) => {
  return (
    <>
      {error && <span className="text-red-500">{alert(error)}</span>}
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-screen">
          {/* Left Side - Image */}
          <div className="hidden md:block md:w-[50%]">
            <img
              src={banner1}
              alt="loginImage"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Right Side - Form */}
          <div className="flex flex-col justify-center items-center md:w-[50%] bg-blue-100 p-8 md:h-auto h-full">
            <Form submitBtn="Login" formType="login" formTitle="Login Page"/>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
