import React from "react";
import InputType from "./InputType";
import { useState } from "react";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

function Form({ submitBtn, formTitle, formType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <form
      onSubmit={(e) => {
        if (formType === "login") return handleLogin(e, email, password, role);
        else if (formType === "register")
          return handleRegister(
            e,
            name,
            role,
            email,
            password,
            organisationName,
            address,
            phone,
            hospitalName,
            website
          );
      }}
      className="w-[90%] bg-white shadow-lg rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">{formTitle}</h2>
      {/* switch statement for login and registration page */}
      <div className="flex md:flex-row flex-col justify-between mb-3">
        {/* Donor Radio */}
        <div className="flex items-center mr-4">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-blue-600"
            name="role"
            id="donorRadio"
            value="donor"
            onChange={(e) => setRole(e.target.value)}
            defaultChecked
          />
          <label htmlFor="donorRadio" className="ml-2 text-gray-700">
            Donor
          </label>
        </div>

        {/* Admin Radio */}
        <div className="flex items-center mr-4">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-blue-600"
            name="role"
            id="adminRadio"
            value="admin"
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="adminRadio" className="ml-2 text-gray-700">
            Admin
          </label>
        </div>

        {/* Hospital Radio */}
        <div className="flex items-center mr-4">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-blue-600"
            name="role"
            id="hospitalRadio"
            value="hospital"
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="hospitalRadio" className="ml-2 text-gray-700">
            Hospital
          </label>
        </div>

        {/* Organisation Radio */}
        <div className="flex items-center">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-blue-600"
            name="role"
            id="organisationRadio"
            value="organisation"
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="organisationRadio" className="ml-2 text-gray-700">
            Organisation
          </label>
        </div>
      </div>

      {(() => {
        switch (true) {
          case formType === "login": {
            return (
              <>
                {/* Email Input */}
                <InputType
                  labelText="Email"
                  labelFor="email"
                  inputType="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
                {/* Password Input */}
                <InputType
                  labelText="Password"
                  labelFor="password"
                  inputType="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Don't have an account? Section */}
                <div className="my-4 text-center">
                  <p className="text-gray-700">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-500 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </>
            );
          }

          case formType === "register":
            {
              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Email Input */}
                    <InputType
                      labelText="Email"
                      labelFor="email"
                      inputType="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Name Input */}
                    {(role === "admin" || role === "donor") && (
                      <InputType
                        labelText="Name"
                        labelFor="name"
                        inputType="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}

                    {/* Password Input */}
                    <InputType
                      labelText="Password"
                      labelFor="password"
                      inputType="password"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Organization Name Input */}
                    {role === "organisation" && (
                      <InputType
                        labelText="Organization Name"
                        labelFor="organisationName"
                        inputType="text"
                        name="organisationName"
                        placeholder="Enter your organization name"
                        value={organisationName}
                        onChange={(e) => setOrganisationName(e.target.value)}
                      />
                    )}
                    {/* Hospital Name Input */}
                    {role === "hospital" && (
                      <InputType
                        labelText="Hospital Name"
                        labelFor="hospitalName"
                        inputType="text"
                        name="hospitalName"
                        placeholder="Enter your hospital name"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                      />
                    )}
                    {/* Website Input */}
                    <InputType
                      labelText="Website"
                      labelFor="website"
                      inputType="url"
                      name="website"
                      placeholder="Enter your website URL"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />

                    {/* Address Input */}
                    <InputType
                      labelText="Address"
                      labelFor="address"
                      inputType="text"
                      name="address"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />

                    {/* Phone Input */}
                    <InputType
                      labelText="Phone"
                      labelFor="phone"
                      inputType="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  {/* Have an account? Section */}
                  <div className="text-center mt-4">
                    <p className="text-gray-700">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-blue-500 hover:underline"
                      >
                        Log in
                      </Link>
                    </p>
                  </div>
                </>
              );
            }
            break;
        }
      })()}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {submitBtn}
        </button>
      </div>
    </form>
  );
}

export default Form;
