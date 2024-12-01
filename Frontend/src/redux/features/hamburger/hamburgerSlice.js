import { createSlice } from "@reduxjs/toolkit";

const hamburgerSlice = createSlice({
    name: 'hamburger',
    initialState: {
        isOpen: false,  // By default, the hamburger is closed
    },
    reducers: {
        toggleHamburger: (state) => {
            state.isOpen = !state.isOpen;  // Toggle between open and close
        },
        closeHamburger: (state) => {
            state.isOpen = false;  // Force close
        },
        openHamburger: (state) => {
            state.isOpen = true;  // Force open
        }
    }
});

export const { toggleHamburger, closeHamburger, openHamburger } = hamburgerSlice.actions;

export default hamburgerSlice.reducer;