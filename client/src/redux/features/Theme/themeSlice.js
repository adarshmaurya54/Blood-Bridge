import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: true,  // Default theme is light mode
  },
  reducers: {
    lightTheme: (state) => {
      state.isDarkMode = false;  // Force light mode
    },
    darkTheme: (state) => {
      state.isDarkMode = true;  // Force dark mode
    },
  },
});

export const { lightTheme, darkTheme } = themeSlice.actions;

export default themeSlice.reducer;
