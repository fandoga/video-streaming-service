"use client";

import { usePathname } from "next/navigation";
import { useGetMovieByIdQuery } from "../api/moviesApi";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";
import Image from "next/image";

interface MovieDetailsProps {
  movieId: string;
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const { data, isLoading, error } = useGetMovieByIdQuery(movieId);
  const pathname = usePathname();

  const contentType = pathname.startsWith("/movies")
    ? "movie"
    : pathname.startsWith("/series")
      ? "series"
      : "";

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  console.log(data);

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-red-500">
          Ошибка загрузки:{" "}
          {"status" in error ? `error ${error.status}` : "Неизвестная ошибка"}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Фильм не найден</div>
      </div>
    );
  }

  return (
    <div className="mb-4 pb-20 flex gap-8">
      <div className="mb-4 min-w-70 aspect-[3/4]">
        <img
          src={data.posterUrl}
          alt={data.title}
          className="w-full h-full rounded-md object-cover"
        />
        {/* <Image
            src={data.posterUrl}
            alt={data.title}
            width={100}
            height={300}
            className="w-full h-full rounded-md object-cover"
          ></Image> */}
      </div>
      <div className="flex flex-col justify-between">
        <div className="w-full">
          <h1 className="mb-4 text-3xl font-bold">
            {data.title}
            <small className="font-normal text-md pl-3">
              watch {contentType}
            </small>
          </h1>
          <p className="mb-4 text-lg">{data.description}</p>
        </div>
        <div className="pb-6">
          <div className="text-md text-gray-400">
            <p>Rating: {data.rating}</p>
            <p>Realese Date: {data.releaseDate}</p>
            <p>Year: {data.releaseDate.slice(0, 4)}</p>
            <p>Duration: {data.duration > 0 ? data.duration : "many"} min</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full cursor-default bg-primary px-3 py-1 text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
