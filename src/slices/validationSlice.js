import { createSlice } from "@reduxjs/toolkit";

const validationSlice = createSlice({
  name: "validation",
  initialState: {
    isValid: true,
  },
  reducers: {
    startGame(state, action) {
      return action.payload;
    },
    setValidationStatus: (state, action) => {
      state.isValid = action.payload;
    },
  },
});

export const { setValidationStatus, startGame } = validationSlice.actions;
export default validationSlice.reducer;
