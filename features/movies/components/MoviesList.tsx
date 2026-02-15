"use client";

import { useGetMoviesQuery } from "../api/moviesApi";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

const SKELETON_COUNT = 12;

interface MovieListProps {
  type?: string;
}

export default function MoviesList({ type }: MovieListProps) {
  const params = type ? { type } : {};

  const { data, isLoading, error, isFetching } = useGetMoviesQuery(params);

  if (isLoading) {
    return (
      <div className="p-4 w-full max-w-7xl grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    );
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

  if (!data || data.movies.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Фильмы не найдены</div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-7xl flex justify-center">
      {isFetching && (
        <div className="mb-4 text-sm text-gray-500">Обновление данных...</div>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.movies.map(
          (movie) =>
            movie.posterUrl && <MovieCard key={movie.id} movie={movie} />
        )}
      </div>
    </div>
  );
}
