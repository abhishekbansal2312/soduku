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

export const selectTimer = (state) => {
  const hours = Math.floor(state.timer.time / 3600);
  const minutes = Math.floor((state.timer.time % 3600) / 60);
  const seconds = state.timer.time % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return { formattedHours, formattedMinutes, formattedSeconds };
};
