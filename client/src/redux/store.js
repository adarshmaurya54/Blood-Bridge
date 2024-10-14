import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice";
import hamburgerSlice from "./features/hamburger/hamburgerSlice";  
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        hamburger: hamburgerSlice,
    }
})

export default store;