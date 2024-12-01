import { useState } from "react";
import banner1 from "../../assets/images/banner1.jpg";
import Form from "../../components/shared/Form/Form";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const {loading, error, user} = useSelector(state => state.auth)
  const navigate = useNavigate();
  if(user){
    navigate("/");
  }
  return (
    <>
        {loading && <Spinner message="Please wait..."/>}
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
          <div className="flex flex-col justify-center items-center md:w-[50%] bg-blue-100 p-3 md:h-auto h-full">
            <Form submitBtn="Login" formType="login" formTitle="Login Page"/>
          </div>
        </div>
      
    </>
  );
};

export default Login;
