export interface Movie {
  id: string; // imdbID из OMDB
  title: string;
  description: string; // Plot из OMDB
  posterUrl: string; // Poster из OMDB
  backdropUrl: string; // можно оставить пустым или использовать Poster
  releaseDate: string; // Released из OMDB
  rating: number; // imdbRating из OMDB (нужно парсить)
  genres: string[]; // Genre из OMDB (нужно парсить строку)
  duration: number; // Runtime из OMDB (нужно парсить "N min")
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
  type?: string;
}
