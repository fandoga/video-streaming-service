"use client";

import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/features/movies/types/movies.types";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`movies/${movie.id}`}>
      <Card className="relative w-full pt-0 overflow-hidden cursor-pointer">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="relative z-20 object-cover w-full aspect-[6/9]"
        />
        <div>
          <CardHeader>
            <CardTitle className="max-h-4 -mt-2 mb-2">{movie.title}</CardTitle>
            <CardDescription>{movie.releaseDate}</CardDescription>
          </CardHeader>
        </div>
      </Card>
    </Link>
  );
}
