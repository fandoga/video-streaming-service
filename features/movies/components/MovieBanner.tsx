import { Button } from "@/components/ui/button";
import React from "react";

const MovieBanner = () => {
  return (
    <div className="relative h-90 w-full overflow-hidden">
      <img
        className="size-full object-cover"
        src="https://images-s.kinorium.com/movie/poster/528138/w1500_51445600.jpg"
        alt="avatar-banner"
      />
      <div
        className="absolute inset-0 w-[40%] bg-gradient-to-r from-black/90 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 pt-55 pl-35">
        <Button className="cursor-pointer h-12 text-lg" size={"lg"}>
          Watch now
        </Button>
      </div>
    </div>
  );
};

export default MovieBanner;
