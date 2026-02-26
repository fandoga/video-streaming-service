import { MoviesList } from "@/features/movies";

export default function SeriesPage() {
  return (
    <main className="mx-auto max-w-7xl h-full">
      <MoviesList type="series" category="popular" />
    </main>
  );
}
