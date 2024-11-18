import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refreshToken",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "getUserInfo", // Replace with the actual endpoint
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useGetUserQuery } = apiSlice;
