"use client";

import { useState } from "react";
import { useSearchMoviesQuery } from "../api/moviesApi";

export default function SearchMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");

  const { data, isLoading, error, isFetching } = useSearchMoviesQuery(
    { query },
    { skip: !query }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setQuery(searchQuery.trim());
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск фильмов..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            Поиск
          </button>
        </div>
      </form>

      {!query && (
        <div className="text-center text-gray-500">
          Введите запрос для поиска фильмов
        </div>
      )}

      {isLoading && query && (
        <div className="flex items-center justify-center p-8">
          <div className="text-lg">Поиск фильмов...</div>
        </div>
      )}

      {isFetching && data && (
        <div className="mb-4 text-sm text-gray-500">
          Обновление результатов...
        </div>
      )}

      {error && query && (
        <div className="flex items-center justify-center p-8">
          <div className="text-lg text-red-500">
            Ошибка поиска:{" "}
            {"status" in error ? `error ${error.status}` : "Неизвестная ошибка"}
          </div>
        </div>
      )}

      {data && query && (
        <>
          {data.movies.length === 0 ? (
            <div className="text-center text-gray-500">
              Фильмы не найдены по запросу &quot;{query}&quot;
            </div>
          ) : (
            <div>
              <div className="mb-4 text-sm text-gray-600">
                Найдено: {data.total} фильмов
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="rounded-lg border border-gray-200 p-4 shadow-sm"
                  >
                    <h3 className="mb-2 text-lg font-semibold">
                      {movie.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">
                      {movie.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      Рейтинг: {movie.rating} | {movie.releaseDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
