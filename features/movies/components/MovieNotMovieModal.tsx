"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface MovieNotMovieModalProps {
  open: boolean;
  onClose: () => void;
}

const MovieNotMovieModal = ({ open, onClose }: MovieNotMovieModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 bg-black/70">
      <Card className="mt-60 mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">We are not Pirates</CardTitle>
          <CardDescription>Use real Netflix, HBO or Kinopoisk</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="test-sm">
            Поскольку это не пиратский сайт, а просто демонстрация, здесь не
            получиться посмотреть все эти фильмы и сериалы. Вы можете посмотреть
            их на Кинопоиске или любой другой официальной площадке. Поэтому
            давайте посмотрим на этот прекрасный мемный ролик))
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="w-full cursor-pointer"
          >
            Так уже и быть
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MovieNotMovieModal;
