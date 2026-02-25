"use client";

import { useEffect, useRef, useState } from "react";
import { useGetMoviesQuery } from "../api/moviesApi";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import { Movie } from "../types/movies.types";

const SKELETON_COUNT = 12;

interface MovieListProps {
  type?: string;
}

export default function MoviesList({ type }: MovieListProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const moviesRef = useRef<Movie[]>([]);
  const params = {
    page,
    type: type && type,
  };

  const { data, isLoading, error, isFetching } = useGetMoviesQuery(params);

  const hasMore = data ? page < data.totalPages : true;

  useEffect(() => {
    if (!data) return;

    const existId = new Set(moviesRef.current.map((m) => m.id));
    const next = data.movies.filter((m) => !existId.has(m.id));

    if (next.length > 0) {
      console.log(movies);
      const updated = [...moviesRef.current, ...next];
      moviesRef.current = updated;
      setMovies(updated);
    }
  }, [data]);

  useEffect(() => {
    if (!loaderRef.current || isFetching) return;

    // Отключаем предыдущий observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting && !isFetching) {
        setPage((p) => p + 1);
        observer.unobserve(entry.target);
      }
    });

    observerRef.current.observe(loaderRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isFetching]);

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
    <div className="py-14 w-full max-w-7xl justify-center">
      {isFetching && (
        <div className="mb-4 text-sm text-gray-500">Обновление данных...</div>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map(
          (movie) =>
            movie.posterUrl && <MovieCard key={movie.id} movie={movie} />
        )}
      </div>
      {hasMore && (
        <div className="max-w-18 pt-10 text-2xl mb-10 mx-auto" ref={loaderRef}>
          {isFetching && page > 1 && "Loading..."}
        </div>
      )}
    </div>
  );
}
