import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import type {
  Movie,
  MoviesResponse,
} from "@/features/movies/types/movies.types";

interface MoviesData {
  movies: Movie[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const genre = searchParams.get("genre");
  const searchQuery = searchParams.get("q");

  // Читаем JSON файл
  const filePath = join(process.cwd(), "data", "movies.json");
  const fileContents = readFileSync(filePath, "utf8");
  const moviesData: MoviesData = JSON.parse(fileContents);

  let movies: Movie[] = [...moviesData.movies];

  // Фильтрация по жанру
  if (genre) {
    movies = movies.filter((movie) =>
      movie.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
  }

  // Поиск
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    movies = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)
    );
  }

  // Пагинация
  const total = movies.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedMovies = movies.slice(startIndex, endIndex);

  const response: MoviesResponse = {
    movies: paginatedMovies,
    total,
    page,
    totalPages,
  };

  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(response);
}
