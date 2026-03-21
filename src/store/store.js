import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/CartSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
