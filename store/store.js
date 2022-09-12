import { configureStore } from "@reduxjs/toolkit";
import getCartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    getCart: getCartReducer,
  },
});
