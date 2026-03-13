import MovieBanner from "@/features/movies/components/MovieBanner";
import MovieBrandsCarousel from "@/features/movies/components/MovieBrandsCarousel";
import MovieCarousel from "@/features/movies/components/MovieCarousel";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col px-6 justify-center items-center">
      <MovieBanner />
      <MovieBrandsCarousel />
      <MovieCarousel />
    </div>
  );
}
