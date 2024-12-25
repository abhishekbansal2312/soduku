import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    time: 0,
    isRunning: true,
  },
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.time = 0;
      state.isRunning = false;
    },
    incrementTime: (state) => {
      if (state.isRunning) {
        state.time += 1;
      }
    },
  },
});

export const { startTimer, stopTimer, resetTimer, incrementTime } =
  timerSlice.actions;

export default timerSlice.reducer;
