"use client";
import { url } from "inspector";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "./authSlice";

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
        url: "register",
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
        url: "activate-user",
        method: "POST",
        body: { activation_token, activation_code },
        // credentials:"include" as const
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (error: any) {
          if (error.error) {
            console.error("Error:", error.error.data.message);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (error: any) {
          if (error.error) {
            console.error("Error:", error.error.data.message);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useActivationMutation,
  useSocialAuthMutation,
} = authApi;
