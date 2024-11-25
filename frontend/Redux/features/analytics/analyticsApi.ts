import { apiSlice } from "../api/apiSlice";

const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: "get-courses-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetCoursesAnalyticsQuery } = analyticsApi;
