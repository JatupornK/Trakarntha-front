import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: { products: productSlice, auth: authSlice, user: userSlice },
});
