import { NextResponse } from "next/server";
import type {
  Movie,
  MoviesResponse,
} from "@/features/movies/types/movies.types";
import type {
  TMDBMovie,
  TMDBResponse,
} from "@/features/movies/types/tmdb.types";
import { TMDB_GENRES } from "@/features/movies/types/tmdb.types";

const TMDB_BASE_URL = `https://api.themoviedb.org/3`;
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";
const TMDB_API_KEY = process.env.TMDB_API_KEY || "";

function transformTMDBToMovie(item: TMDBMovie): Movie {
  return {
    id: String(item.id),
    title: item.title || item.name || "",
    description: item.overview || "",
    posterUrl: item.poster_path
      ? `${TMDB_IMAGE_URL}/w500${item.poster_path}`
      : "",
    backdropUrl: item.backdrop_path
      ? `${TMDB_IMAGE_URL}/w1280${item.backdrop_path}`
      : "",
    releaseDate: item.release_date || item.first_air_date || "",
    rating: Math.round(item.vote_average * 10) / 10,
    genres: item.genre_ids
      .map((id) => TMDB_GENRES[id])
      .filter((name): name is string => Boolean(name)),
    duration: 0, // заполняется при запросе деталей
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const type = searchParams.get("type") || "movie"; // "movie" | "tv"
  const searchQuery = searchParams.get("q") || searchParams.get("s") || "";
  const category = searchParams.get("category") || "popular";
  // category: "popular" | "top_rated" | "now_playing" | "upcoming" | "trending"

  if (!TMDB_API_KEY) {
    return NextResponse.json(
      { error: "TMDB API key is not configured" },
      { status: 500 }
    );
  }

  try {
    let url: string;

    if (searchQuery) {
      // Поиск
      const mediaType = type === "series" || type === "tv" ? "tv" : "movie";
      const params = new URLSearchParams({
        api_key: TMDB_API_KEY,
        language: "en-US",
        query: searchQuery,
        page: page.toString(),
      });
      url = `${TMDB_BASE_URL}/search/${mediaType}?${params}`;
    } else if (category === "trending") {
      // Тренды
      const mediaType = type === "series" || type === "tv" ? "tv" : "movie";
      const params = new URLSearchParams({
        api_key: TMDB_API_KEY,
        language: "en-US",
        page: page.toString(),
      });
      url = `${TMDB_BASE_URL}/trending/${mediaType}/week?${params}`;
    } else {
      // Подборки: popular, top_rated, now_playing, upcoming
      const mediaType = type === "series" || type === "tv" ? "tv" : "movie";
      const params = new URLSearchParams({
        api_key: TMDB_API_KEY,
        language: "en-US",
        page: page.toString(),
      });
      url = `${TMDB_BASE_URL}/${mediaType}/${category}?${params}`;
    }

    console.log("Requesting URL:", url);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "video-streaming-service/1.0",
        Accept: "application/json",
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const tmdbData: TMDBResponse = await response.json();

    const movies: Movie[] = tmdbData.results.map(transformTMDBToMovie);

    const result: MoviesResponse = {
      movies,
      total: tmdbData.total_results,
      page: tmdbData.page,
      totalPages: tmdbData.total_pages,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("TMDB API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies from TMDB API" },
      { status: 500 }
    );
  }
}
