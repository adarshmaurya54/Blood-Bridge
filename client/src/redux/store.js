import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice";
import hamburgerSlice from "./features/hamburger/hamburgerSlice";
import themeSlice from "./features/Theme/themeSlice"  
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        hamburger: hamburgerSlice,
        theme: themeSlice
    }
})

export default store;