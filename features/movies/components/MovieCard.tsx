"use client";

import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/features/movies/types/movies.types";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-foreground shadow-sm shadow-black transition hover:-translate-y-1"
    >
      <div className="relative aspect-[6/8] w-full overflow-hidden bg-zinc-800">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:brightness-120"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-1 text-lg font-semibold text-white">
          {movie.title}
        </h3>
        <div className="mt-auto flex items-center justify-between text-[11px] text-zinc-500">
          <span>{movie.releaseDate}</span>
        </div>
      </div>
    </Link>
  );
}
