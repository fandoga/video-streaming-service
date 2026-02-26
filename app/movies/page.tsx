import { MoviesList } from "@/features/movies";

export default function MoviesPage() {
  return (
    <main className="mx-auto max-w-7xl h-full">
      <MoviesList type="movie" />
    </main>
  );
}
