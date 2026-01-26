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
}

export interface GetMoviesParams {
  page?: number;
  limit?: number;
  genre?: string;
}
