import { createSlice } from "@reduxjs/toolkit";

const validationSlice = createSlice({
  name: "validation",
  initialState: {
    isValid: true,
  },
  reducers: {
    setValidationStatus: (state, action) => {
      state.isValid = action.payload;
    },
  },
});

export const { setValidationStatus } = validationSlice.actions;
export default validationSlice.reducer;
