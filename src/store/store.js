import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../slices/filterSlice";
import styleReducer from "../slices/styleSlice";
import timerReducer from "../slices/timerSlice";
const store = configureStore({
  reducer: {
    filter: filterReducer,
    style: styleReducer,
    timer: timerReducer,
  },
});

export default store;
