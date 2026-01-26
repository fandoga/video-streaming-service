"use client";

import Image from "next/image";
import { useGetMoviesQuery } from "../api/moviesApi";

export default function MoviesList() {
  const { data, isLoading, error, isFetching } = useGetMoviesQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Загрузка фильмов...</div>
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
    <div className="p-4">
      {isFetching && (
        <div className="mb-4 text-sm text-gray-500">Обновление данных...</div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.movies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <img src={movie.posterUrl} alt="posterImg"/>
            <h3 className="mb-2 text-lg font-semibold">{movie.title}</h3>
            <p className="mb-2 text-sm text-gray-600">{movie.description}</p>
            <div className="text-xs text-gray-500">
              Рейтинг: {movie.rating} | {movie.releaseDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
