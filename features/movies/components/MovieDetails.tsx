"use client";

import { useGetMovieByIdQuery } from "../api/moviesApi";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";

interface MovieDetailsProps {
  movieId: string;
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const { data, isLoading, error } = useGetMovieByIdQuery(movieId);

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

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
    <div className="p-4 pb-20">
      <div className="mb-4 flex gap-4">
        <div className="mb-4 h-1/2 w-1/4">
          <img
            src={data.posterUrl}
            alt={data.title}
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div className="w-full">
          <h1 className="mb-4 text-3xl font-bold">
            {data.title}
            <small className="font-normal text-md"> смотреть фильм</small>
          </h1>
          <p className="mb-4 text-lg">{data.description}</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {data.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-gray-200 px-3 py-1 text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            <p>Рейтинг: {data.rating}</p>
            <p>Дата выхода: {data.releaseDate}</p>
            <p>Длительность: {data.duration} мин</p>
          </div>
        </div>
      </div>
    </div>
  );
}
