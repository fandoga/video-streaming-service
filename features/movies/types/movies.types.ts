export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  rating: number;
  genres: string[];
  duration: number;
}

export interface MoviesResponse {
  movies: Movie[];
  total: number;
  page: number;
  totalPages: number;
}

export interface SearchMoviesParams {
  query: string;
  page?: number;
  type?: string; // "movie" | "tv"
}

export interface GetMoviesParams {
  page?: number;
  type?: string; // "movie" | "tv"
  category?: string; // "popular" | "top_rated" | "trending" | "now_playing" | "upcoming"
}
