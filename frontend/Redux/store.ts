"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

import { apiSlice } from "./features/api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // devTools: false,
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(apiSlice.middleware),
});

//  this is already fixed in the  backend

// call the refresh token  functinality on every page load
// const initializeApp = async () => {
//   await store.dispatch(
//     apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
//   );
//   await store.dispatch(
//     apiSlice.endpoints.getUser.initiate({}, { forceRefetch: true })
//   );
// };

// initializeApp();
