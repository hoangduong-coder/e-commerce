import { configureStore } from "@reduxjs/toolkit";
import authStore from "./authSlice";
import productStore from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productStore,
    auth: authStore
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch