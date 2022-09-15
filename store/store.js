import { configureStore } from "@reduxjs/toolkit";
import getCartReducer from "./cartSlice";
import getProductReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    getCart: getCartReducer,
    getProduct: getProductReducer,
  },
});
