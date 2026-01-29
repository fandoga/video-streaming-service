import { NextResponse } from "next/server";
import type { Movie } from "@/features/movies/types/movies.types";
import type { OMDBSingleMovieResponse } from "@/features/movies/types/omdb.types";

const OMDB_API_URL = "http://www.omdbapi.com/";
const OMDB_API_KEY =
  process.env.OMDB_API_KEY || process.env.NEXT_PUBLIC_OMDB_API_KEY || "";

// Преобразование OMDB детального ответа в наш формат Movie
function transformOMDBDetailToMovie(omdbData: OMDBSingleMovieResponse): Movie {
  // Парсинг рейтинга (может быть "8.5" или "N/A")
  const rating =
    omdbData.imdbRating && omdbData.imdbRating !== "N/A"
      ? parseFloat(omdbData.imdbRating)
      : 0;

  // Парсинг жанров (строка вида "Action, Drama, Thriller")
  const genres = omdbData.Genre
    ? omdbData.Genre.split(",").map((g) => g.trim())
    : [];

  // Парсинг длительности (строка вида "142 min" или "N/A")
  const duration =
    omdbData.Runtime && omdbData.Runtime !== "N/A"
      ? parseInt(omdbData.Runtime.replace(/\D/g, "")) || 0
      : 0;

  return {
    id: omdbData.imdbID,
    title: omdbData.Title,
    description: omdbData.Plot || "",
    posterUrl: omdbData.Poster !== "N/A" ? omdbData.Poster : "",
    backdropUrl: omdbData.Poster !== "N/A" ? omdbData.Poster : "",
    releaseDate: omdbData.Released || omdbData.Year || "",
    rating,
    genres,
    duration,
  };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!OMDB_API_KEY) {
    return NextResponse.json(
      { error: "OMDB API key is not configured" },
      { status: 500 }
    );
  }

  try {
    // OMDB использует параметр "i" для получения фильма по imdbID
    const omdbParams = new URLSearchParams({
      apikey: OMDB_API_KEY,
      i: id,
    });

    const omdbResponse = await fetch(
      `${OMDB_API_URL}?${omdbParams.toString()}`
    );
    const omdbData: OMDBSingleMovieResponse = await omdbResponse.json();

    if (omdbData.Response === "False" || omdbData.Error) {
      return NextResponse.json(
        { error: omdbData.Error || "Movie not found", requestId: id },
        { status: 404 }
      );
    }

    const movie = transformOMDBDetailToMovie(omdbData);
    return NextResponse.json(movie);
  } catch (error) {
    console.error("OMDB API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie from OMDB API", requestId: id },
      { status: 500 }
    );
  }
}
