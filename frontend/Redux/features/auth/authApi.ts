"use client";
import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoint for user registration
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            userRegistration({
              token: response.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log("error", error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "/activate-user",
        method: "POST",
        body: { activation_token, activation_code },
        // credentials:"include" as const
      }),
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
