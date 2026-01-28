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
      className="group flex flex-col overflow-hidden rounded-lg bg-zinc-900/80 shadow-sm transition hover:-translate-y-1"
    >
      <div className="relative aspect-[6/8] w-full overflow-hidden bg-zinc-800">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-white">
          {movie.title}
        </h3>
        <p className="line-clamp-2 text-xs text-zinc-400">
          {movie.description}
        </p>
        <div className="mt-auto flex items-center justify-between text-[11px] text-zinc-500">
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
            ★ {movie.rating}
          </span>
          <span>{movie.releaseDate}</span>
        </div>
      </div>
    </Link>
  );
}
