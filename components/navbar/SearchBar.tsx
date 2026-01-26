"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchMoviesQuery } from "@/features/movies/api/moviesApi";
import Link from "next/link";
import type { Movie } from "@/features/movies/types/movies.types";

interface SearchBarProps {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useSearchMoviesQuery(
    { query: searchQuery },
    { skip: searchQuery.length < 2 }
  );

  useEffect(() => {
    setIsOpen(searchQuery.length >= 2);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск фильмов..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-black focus:border-blue-500 focus:outline-none"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-96 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Поиск...</div>
          ) : data && data.movies.length > 0 ? (
            <div className="py-2">
              {data.movies.slice(0, 5).map((movie: Movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setSearchQuery("");
                    onClose?.();
                  }}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <div className="font-semibold">{movie.title}</div>
                  <div className="text-sm text-gray-500">
                    {movie.releaseDate} • Рейтинг: {movie.rating}
                  </div>
                </Link>
              ))}
              {data.movies.length > 5 && (
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => {
                    setIsOpen(false);
                    onClose?.();
                  }}
                  className="block px-4 py-2 text-center text-blue-500 hover:bg-gray-100"
                >
                  Показать все результаты ({data.total})
                </Link>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Фильмы не найдены
            </div>
          )}
        </div>
      )}
    </div>
  );
}
