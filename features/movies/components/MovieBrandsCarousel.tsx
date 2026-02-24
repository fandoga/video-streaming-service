"use client";

import React from "react";

const MovieBrandsCarousel = () => {
  const brands = [
    "/img/brands/HBO.svg.png",
    "/img/brands/Paramount.svg.png",
    "/img/brands/sony.png",
    "/img/brands/Universal.png",
    "/img/brands/warner.png",
    "/img/brands/Disney.svg.png",
  ];

  // Дублируем массив, чтобы создать бесконечную «ленту»
  const loopBrands = [...brands, ...brands];

  return (
    <div className="overflow-hidden w-full">
      <div className="flex w-max gap-50 mt-20 animate-[brands-marquee_20s_linear_infinite]">
        {loopBrands.map((brand, index) => (
          <div className="h-20 w-30" key={`${brand}-${index}`}>
            <img
              src={brand}
              alt="brands"
              className="object-contain size-full filter brightness-0 invert"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieBrandsCarousel;
