"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useGetMovieByIdQuery } from "../api/moviesApi";
import MoviePlayerSkeleton from "./MoviePlayerSkeleton";
import MovieNotMovieModal from "./MovieNotMovieModal";

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
  const [hasShownPopup, setHasShownPopup] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("hasSeenNotMoviePopup") === "true";
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleFirstClick = () => {
    setIsModalOpen(true);
    setHasShownPopup(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenNotMoviePopup", "true");
    }
  };

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
      <MovieNotMovieModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="relative aspect-video w-full">
        {!hasShownPopup && (
          <button
            type="button"
            className="absolute inset-0 z-20 h-full w-full cursor-pointer bg-transparent"
            onClick={handleFirstClick}
          />
        )}
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
