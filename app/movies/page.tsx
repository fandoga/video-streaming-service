import { MoviesList } from "@/features/movies";

export default function MoviesPage() {
  return (
    <div className="relative w-full min-h-screen px-6 bg-repeat bg-[url(/img/background.png)]">
      <main className="relative z-10 mx-auto py-12 max-w-7xl">
        <MoviesList type="movie" />
      </main>
    </div>
  );
}
