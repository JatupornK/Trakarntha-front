import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";

export const store = configureStore({
  reducer: { products: productSlice, auth: authSlice, user: userSlice, admin: adminSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
