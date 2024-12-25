import { createSlice } from "@reduxjs/toolkit";

export const colors = [
  "#FFFFFF", // White
  "#FFDEAD", // Navajo White
  "#FFE4B5", // Moccasin
  "#F5F5DC", // Beige
  "#FFFACD", // Lemon Chiffon
  "#F0E68C", // Khaki
  "#E0FFFF", // Light Cyan
  "#B0E0E6", // Powder Blue
  "#AFEEEE", // Pale Turquoise
  "#D3D3D3", // Light Gray
  "#FFB6C1", // Light Pink
  "#ADD8E6", // Light Blue
  "#E6E6FA", // Lavender
  "#D8BFD8", // Thistle
  "#FFE4E1", // Misty Rose
];

const styleSlice = createSlice({
  name: "style",
  initialState: {
    theme: "#FFFFFF",
  },
  reducers: {
    toggleTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme } = styleSlice.actions;
export default styleSlice.reducer;
