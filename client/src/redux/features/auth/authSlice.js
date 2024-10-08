import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "./authActions";

// checking if already token 
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
  loading: false,
  user: null,
  token,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login user
    // if the login action in pending
    builder.addCase(userLogin.pending, (state)=> {
      state.loading = true,
      state.error = null
    })

    // if the login action is successful
    builder.addCase(userLogin.fulfilled, (state, {payload})=> {
      state.loading = false,
      state.user = payload.user,
      state.token = payload.token
    })

    // if the login action is failed or rejected
    builder.addCase(userLogin.rejected, (state, {payload})=> {
      state.loading = false,
      state.error = payload
    })

    //register

    // if the register action in pending
    builder.addCase(userRegister.pending, (state)=> {
      state.loading = true,
      state.error = null
    })

    // if the login action is successful
    builder.addCase(userRegister.fulfilled, (state, {payload})=> {
      state.loading = false,
      state.user = payload.user
    })

    // if the login action is failed or rejected
    builder.addCase(userRegister.rejected, (state, {payload})=> {
      state.loading = false,
      state.error = payload
    })
  },
});

export default authSlice;
