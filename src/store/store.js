import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../slices/filterSlice";
import validationReducer from "../slices/validationSlice";
const store = configureStore({
  reducer: {
    filter: filterReducer,
    validation: validationReducer,
  },
});

export default store;
