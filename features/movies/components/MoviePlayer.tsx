"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useGetMovieByIdQuery } from "../api/moviesApi";
import MoviePlayerSkeleton from "./MoviePlayerSkeleton";

type MovieSource = {
  src: string;
  type?: string;
  label: string; // подпись качества: 1080p, 720p и т.п.
};

interface MoviePlayerProps {
  sources: MovieSource[];
  movieId: string;
}

export const MoviePlayer = ({ movieId, sources }: MoviePlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
  const [currentSource, setCurrentSource] = useState<MovieSource>(sources[0]);
  const { data, isLoading } = useGetMovieByIdQuery(movieId);
  // Инициализация / очистка завязана на маунт/анмаунт DOM-узла

  const handleVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      // unmount: очищаем плеер
      if (!node) {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
        videoRef.current = null;
        return;
      }

      // mount: сохраняем ссылку на DOM-элемент и инициализируем video.js
      videoRef.current = node;

      if (!playerRef.current) {
        playerRef.current = videojs(node, {
          controls: true,
          preload: "auto",
          responsive: true,
          fluid: true,
          sources: [currentSource],
          poster: data?.posterUrl || undefined,
        });
      }
    },
    [currentSource, data]
  );

  // Переключение качества при изменении currentSource
  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.src({
      src: currentSource.src,
      type: currentSource.type ?? "video/mp4",
    });
  }, [currentSource]);

  if (isLoading) {
    return <MoviePlayerSkeleton />;
  }

  return (
    <div className="mx-auto w-full max-w-6xl pb-20">
      {/* <div className="mb-2 flex justify-end gap-2">
        <span className="text-xs text-zinc-400">Качество:</span>
        <div className="inline-flex rounded-md bg-zinc-900/80 p-1 text-xs">
          {sources.map((source) => (
            <button
              key={source.label}
              type="button"
              onClick={() => setCurrentSource(source)}
              className={`px-2 py-0.5 rounded ${
                currentSource.label === source.label
                  ? "bg-red-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {source.label}
            </button>
          ))}
        </div>
      </div> */}

      <div className="aspect-video w-full">
        <div data-vjs-player className="h-full w-full">
          <video
            ref={handleVideoRef}
            className="video-js vjs-big-play-centered vjs-default-skin h-full w-full overflow-hidden rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
