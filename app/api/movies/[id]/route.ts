import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import type { Movie } from "@/features/movies/types/movies.types";

interface MoviesData {
  movies: Movie[];
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Читаем JSON файл
  const filePath = join(process.cwd(), "data", "movies.json");
  const fileContents = readFileSync(filePath, "utf8");
  const moviesData: MoviesData = JSON.parse(fileContents);

  const targetId = `${id}`;

  // Делаем поиск по строковому id, чтобы работало и с числовыми, и со строковыми id в JSON
  const movie = moviesData.movies.find((m) => `${m.id}` === targetId);

  if (!movie) {
    return NextResponse.json(
      { error: "Movie not found", requestId: targetId },
      { status: 404 }
    );
  }

  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json(movie);
}
