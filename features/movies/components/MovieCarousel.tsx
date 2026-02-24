"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import recMovies from "@/data/recMovies.json";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const MovieCarousel = () => {
  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <div className="relative w-7xl m-auto pt-20 ">
      <Carousel
        className="transition-all hover:shadow-xl shadow-blue-500/7"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {recMovies.map((movie) => (
            <CarouselItem key={movie.name} className="aspect-[6/3]">
              <div className="relative size-full cursor-pointer rounded-lg bg-muted flex items-center justify-center text-center text-sm overflow-hidden">
                <img
                  className="object-cover size-full"
                  src={movie.img}
                  alt={movie.name}
                />
                <div className="absolute inset-0 top-142 max-w-7xl mx-auto">
                  <Button
                    className="rounded-full cursor-pointer text-white hover:scale-103"
                    size={"lg"}
                  >
                    Read more
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
