"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const hasSeenPopup = localStorage.getItem("hasSeenVpnPopup");
      return !hasSeenPopup;
    }
  });

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenVpnPopup", "true");
  };

  if (isOpen)
    return (
      <div className="fixed inset-0 z-200 bg-black/70">
        <Card className="mt-60 mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <img
              className="w-full h-36 mb-4 object-contain"
              src="/img/icons/error.png"
              alt="connection_lost-icon"
            />
            <CardTitle className="text-lg">Please use VPN</CardTitle>
            <CardDescription>Or any other proxy</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="test-sm">
              Этот сайт испольет TMDB API для получение фильмов и сериалов. К
              сожелению данный API не работает корректно из-за блокировок,
              альтернив найти не удалось. Спасибо за понимание.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleClose}
              variant="outline"
              size="sm"
              className="w-full cursor-pointer"
            >
              Ok, i got it
            </Button>
          </CardFooter>
        </Card>
      </div>
    );

  return;
};

export default Popup;
