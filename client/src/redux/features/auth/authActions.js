import { createAsyncThunk } from "@reduxjs/toolkit"; //used to perform asynchronous tasks in a slice
import API from "../../../services/API";
import { toast } from "react-toastify";

//login
// login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });

      // storing the token that generated when we request to login api
      if (data.success) {
        localStorage.setItem("token", data.token); // data.token, we getting this from the authController.js file from the loginController.
        toast.success(data.message);
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message); // Ensure rejection for unsuccessful response
      }

      return data;
    } catch (error) {
      // Handle server error (like 500 status)
      if (error.response) {
        if (error.response.status === 500) {
          toast.error(error.response.data.message); // 500 error toast
        }
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
        return rejectWithValue(error.message);
      }
    }
  }
);

//register
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      organisationName,
      address,
      phone,
      hospitalName,
      website,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        organisationName,
        address,
        phone,
        hospitalName,
        website,
      });
      if (data.success) {
        toast.success(data.message);
        window.location.replace("/login");
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
