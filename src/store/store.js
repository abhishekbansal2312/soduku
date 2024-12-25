import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../slices/filterSlice";
import styleReducer from "../slices/styleSlice";
const store = configureStore({
  reducer: {
    filter: filterReducer,
    style: styleReducer,
  },
});

export default store;
