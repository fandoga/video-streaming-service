"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-foreground/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Getflix
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-white transition-colors hover:text-gray-300"
          >
            Главная
          </Link>
          <Link
            href="/movies"
            className="text-white transition-colors hover:text-gray-300"
          >
            Фильмы
          </Link>
          <Link
            href="/series"
            className="text-white transition-colors hover:text-gray-300"
          >
            Сериалы
          </Link>
          <Link
            href="/my-list"
            className="text-white transition-colors hover:text-gray-300"
          >
            Мой список
          </Link>
        </div>

        {/* Search and Profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden"
            aria-label="Поиск"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Profile */}
          {/* <div className="h-8 w-8 rounded-full bg-gray-600"></div> */}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-800 px-4 py-3 md:hidden">
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
    </nav>
  );
}
