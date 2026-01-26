import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const exampleApi = createApi({
  reducerPath: "exampleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.example.com/",
  }),
  tagTypes: ["Example"],
  endpoints: (builder) => ({
    getExample: builder.query({
      query: (id) => `example/${id}`,
      providesTags: ["Example"],
    }),
    createExample: builder.mutation({
      query: (body) => ({
        url: "example",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Example"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetExampleQuery, useCreateExampleMutation } = exampleApi;
