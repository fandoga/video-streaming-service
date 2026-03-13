import { MoviesList } from "@/features/movies";

export default function SeriesPage() {
  return (
    <div className="relative w-full min-h-screen px-6 bg-repeat bg-[url(/img/background.png)]">
      <main className="mx-auto z-10 relative py-12 max-w-7xl h-full">
        <MoviesList type="series" category="popular" />
      </main>
    </div>
  );
}
