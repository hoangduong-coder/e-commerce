import { configureStore } from "@reduxjs/toolkit";
import authStore from "./authSlice";

export const store = configureStore({
  reducer: {
    // products: productStore,
    // users: userStore,
    auth: authStore
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch