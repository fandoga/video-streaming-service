import { NextResponse } from "next/server";
import type { Movie } from "@/features/movies/types/movies.types";
import type { TMDBDetailMovie } from "@/features/movies/types/tmdb.types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";
const TMDB_API_KEY = process.env.TMDB_API_KEY || "";

// Преобразование TMDB детального ответа в наш формат Movie
function transformTMDBDetailToMovie(tmdbData: TMDBDetailMovie): Movie {
  const duration =
    tmdbData.runtime ||
    (tmdbData.episode_run_time && tmdbData.episode_run_time[0]) ||
    0;

  return {
    id: String(tmdbData.id),
    title: tmdbData.title || tmdbData.name || "",
    description: tmdbData.overview || "",
    posterUrl: tmdbData.poster_path
      ? `${TMDB_IMAGE_URL}/w500${tmdbData.poster_path}`
      : "",
    backdropUrl: tmdbData.backdrop_path
      ? `${TMDB_IMAGE_URL}/w1280${tmdbData.backdrop_path}`
      : "",
    releaseDate: tmdbData.release_date || tmdbData.first_air_date || "",
    rating: Math.round(tmdbData.vote_average * 10) / 10,
    genres: tmdbData.genres.map((g) => g.name),
    duration,
  };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!TMDB_API_KEY) {
    return NextResponse.json(
      { error: "TMDB API key is not configured" },
      { status: 500 }
    );
  }

  try {
    // Сначала пробуем как фильм
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: "en-EN",
    });

    let tmdbResponse = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?${params.toString()}`
    );

    // Если фильм не найден (404), пробуем как сериал
    if (tmdbResponse.status === 404) {
      tmdbResponse = await fetch(
        `${TMDB_BASE_URL}/tv/${id}?${params.toString()}`
      );
    }

    if (!tmdbResponse.ok) {
      return NextResponse.json(
        { error: "Movie not found", requestId: id },
        { status: 404 }
      );
    }

    const tmdbData: TMDBDetailMovie = await tmdbResponse.json();
    const movie = transformTMDBDetailToMovie(tmdbData);

    return NextResponse.json(movie);
  } catch (error) {
    console.error("TMDB API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie from TMDB API", requestId: id },
      { status: 500 }
    );
  }
}
