// Export all public API from movies feature
export {
  moviesApi,
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useSearchMoviesQuery,
} from "./api/moviesApi";

export type {
  Movie,
  MoviesResponse,
  SearchMoviesParams,
  GetMoviesParams,
} from "./types/movies.types";

// Export components
export { default as MoviesList } from "./components/MoviesList";
export { default as MovieDetails } from "./components/MovieDetails";
export { default as SearchMovies } from "./components/SearchMovies";
export { MoviePlayer } from "./components/MoviePlayer";
export { default as MovieCard } from "./components/MovieCard";

// Export skeletons
export { default as MovieDetailsSkeleton } from "./components/MovieDetailsSkeleton";
export { default as MoviePlayerSkeleton } from "./components/MoviePlayerSkeleton";
