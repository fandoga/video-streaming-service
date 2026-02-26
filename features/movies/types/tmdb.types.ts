// TMDB API Response Types

export interface TMDBMovie {
  id: number;
  title?: string; // для фильмов
  name?: string; // для сериалов
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string; // для фильмов
  first_air_date?: string; // для сериалов
  vote_average: number;
  genre_ids: number[];
}

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBDetailMovie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  runtime?: number; // для фильмов (в минутах)
  episode_run_time?: number[]; // для сериалов
  genres: Array<{ id: number; name: string }>;
  status: string;
  tagline?: string;
  imdb_id?: string;
}

export const TMDB_GENRES: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  // TV жанры
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};
