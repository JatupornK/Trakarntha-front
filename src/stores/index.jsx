import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: { products: productSlice, auth: authSlice },
});
