"use client";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";

import { apiSlice } from "./features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    auth: authSlice,
  },
  devTools: false,
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(apiSlice.middleware),
});
