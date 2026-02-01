import { NextResponse } from "next/server";
import type {
  Movie,
  MoviesResponse,
} from "@/features/movies/types/movies.types";
import type {
  OMDBSearchResponse,
  OMDBMovieSearchItem,
} from "@/features/movies/types/omdb.types";

const OMDB_API_URL = "http://www.omdbapi.com/";
const OMDB_API_KEY =
  process.env.OMDB_API_KEY || process.env.NEXT_PUBLIC_OMDB_API_KEY || "";

// Преобразование OMDB ответа в наш формат Movie
function transformOMDBToMovie(item: OMDBMovieSearchItem): Movie {
  const rating =
    item.imdbRating && item.imdbRating !== "N/A"
      ? parseFloat(item.imdbRating)
      : 0;

  return {
    id: item.imdbID,
    title: item.Title,
    description: "", // Будет заполнено при запросе деталей фильма
    posterUrl: item.Poster !== "N/A" ? item.Poster : "",
    backdropUrl: item.Poster !== "N/A" ? item.Poster : "",
    releaseDate: item.Year,
    rating,
    genres: [], // Будет заполнено при запросе деталей фильма
    duration: 0, // Будет заполнено при запросе деталей фильма
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const type = searchParams.get("type") || "movie";
  const searchQuery = searchParams.get("q") || searchParams.get("s") || "";

  if (!OMDB_API_KEY) {
    return NextResponse.json(
      { error: "OMDB API key is not configured" },
      { status: 500 }
    );
  }

  try {
    // Если есть поисковый запрос, используем OMDB Search API
    if (searchQuery) {
      const omdbParams = new URLSearchParams({
        apikey: OMDB_API_KEY,
        s: searchQuery,
        page: page.toString(),
        type: type,
      });

      // Добавляем type только если он указан
      // if (type) {
      //   omdbParams.append("type", type);
      // }

      const omdbResponse = await fetch(
        `${OMDB_API_URL}?${omdbParams.toString()}`
      );
      const omdbData: OMDBSearchResponse = await omdbResponse.json();

      if (omdbData.Response === "False") {
        return NextResponse.json({
          movies: [],
          total: 0,
          page,
          totalPages: 0,
        });
      }

      const movies: Movie[] = (omdbData.Search || []).map(transformOMDBToMovie);
      const total = parseInt(omdbData.totalResults || "0");
      const totalPages = Math.ceil(total / 10); // OMDB возвращает 10 результатов на страницу

      const response: MoviesResponse = {
        movies,
        total,
        page,
        totalPages,
      };

      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("OMDB API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies from OMDB API" },
      { status: 500 }
    );
  }
}
