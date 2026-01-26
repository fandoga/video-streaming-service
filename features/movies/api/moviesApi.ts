import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Movie,
  MoviesResponse,
  SearchMoviesParams,
  GetMoviesParams,
} from "../types/movies.types";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      typeof window !== "undefined" ? "/api" : "http://localhost:3000/api",
  }),
  tagTypes: ["Movies", "Movie"],
  endpoints: (builder) => ({
    // Get list of movies
    getMovies: builder.query<MoviesResponse, GetMoviesParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) {
          searchParams.append("page", params.page.toString());
        }
        if (params?.limit) {
          searchParams.append("limit", params.limit.toString());
        }
        if (params?.genre) {
          searchParams.append("genre", params.genre);
        }
        const queryString = searchParams.toString();
        return `movies${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.movies.map(({ id }) => ({
                type: "Movies" as const,
                id,
              })),
              { type: "Movies", id: "LIST" },
            ]
          : [{ type: "Movies", id: "LIST" }],
    }),

    // Get movie by ID
    getMovieById: builder.query<Movie, string>({
      query: (id) => `movies/${id}`,
      providesTags: (result, error, id) => [{ type: "Movie", id }],
    }),

    // Search movies
    searchMovies: builder.query<MoviesResponse, SearchMoviesParams>({
      query: ({ query, page = 1 }) => {
        const searchParams = new URLSearchParams({
          q: query,
          page: page.toString(),
        });
        return `movies?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.movies.map(({ id }) => ({
                type: "Movies" as const,
                id,
              })),
              { type: "Movies", id: "SEARCH" },
            ]
          : [{ type: "Movies", id: "SEARCH" }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useSearchMoviesQuery,
  useLazyGetMoviesQuery,
  useLazyGetMovieByIdQuery,
  useLazySearchMoviesQuery,
} = moviesApi;
