import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Movie,
  MoviesResponse,
  SearchMoviesParams,
} from "../types/movies.types";

interface GetMoviesParams {
  page?: number;
  type?: string; // "movie" | "tv"
  category?: string; // "popular" | "top_rated" | "trending" | "now_playing" | "upcoming"
  q?: string; // поисковый запрос
}

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // Список фильмов/сериалов (включая поиск через q)
    getMovies: builder.query<MoviesResponse, GetMoviesParams>({
      query: ({ page = 1, type = "movie", category = "popular", q }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          type,
          category,
        });
        if (q) params.set("q", q);
        return `/movies?${params.toString()}`;
      },
    }),

    // Детали фильма по id (использует /api/movies/[id])
    getMovieById: builder.query<Movie, string>({
      query: (id) => `/movies/${id}`,
    }),

    // Поиск (обёртка над тем же /api/movies с параметром q)
    searchMovies: builder.query<MoviesResponse, SearchMoviesParams>({
      query: ({ query, page = 1, type = "movie" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          type,
          q: query,
        });
        return `/movies?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery, useSearchMoviesQuery } =
  moviesApi;
