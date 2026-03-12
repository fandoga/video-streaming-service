import Footer from "@/shared/components/footer/Footer";
import MovieBanner from "@/features/movies/components/MovieBanner";
import MovieBrandsCarousel from "@/features/movies/components/MovieBrandsCarousel";
import MovieCarousel from "@/features/movies/components/MovieCarousel";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <MovieBanner />
      <MovieBrandsCarousel />
      <MovieCarousel />
      <Footer />
    </div>
  );
}
