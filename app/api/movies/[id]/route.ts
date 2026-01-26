import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import type { Movie } from "@/features/movies/types/movies.types";

interface MoviesData {
  movies: Movie[];
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Читаем JSON файл
  const filePath = join(process.cwd(), "data", "movies.json");
  const fileContents = readFileSync(filePath, "utf8");
  const moviesData: MoviesData = JSON.parse(fileContents);

  const movie = moviesData.movies.find((m) => m.id === params.id);

  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json(movie);
}
