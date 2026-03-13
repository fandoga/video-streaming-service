import { notFound } from "next/navigation";
import MovieDetails from "@/features/movies/components/MovieDetails";
import { MoviePlayer } from "@/features/movies/components/MoviePlayer";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="relative w-full min-h-screen bg-repeat bg-[url(/img/background.png)]">
      <main className="mx-auto py-12 max-w-7xl h-full">
        <MovieDetails movieId={id} />
        <MoviePlayer
          movieId={id}
          sources={[
            { src: "/test-vid.mp4", label: "1080p" },
            { src: "/test-vid.mp4", label: "720p" },
          ]}
        />
      </main>
    </div>
  );
}
