"use client";

import { act, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const pathname = usePathname();
  const currentActive =
    pathname === "/"
      ? "home"
      : pathname.startsWith("/movies")
        ? "movies"
        : pathname.startsWith("/series")
          ? "series"
          : pathname.startsWith("/my-list")
            ? "fav"
            : "";

  useEffect(() => {
    const el = refs.current[currentActive];
    if (el) {
      const { offsetWidth, offsetLeft } = el;
      setIndicator({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [currentActive]);

  return (
    <nav className="sticky top-0 z-40 w-full bg-secondary/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-3xl font-bold bg-linear-to-r text-transparent from-cyan-500 to-primary bg-clip-text w-[193px]"
        >
          Getflix
        </Link>

        <div className="relative hidden text-sm items-center gap-6 md:flex">
          {[
            { key: "home", href: "/", label: "Home" },
            { key: "movies", href: "/movies", label: "Movies" },
            { key: "series", href: "/series", label: "Series" },
            { key: "fav", href: "/my-list", label: "Favorites" },
          ].map((item) => (
            <Link
              key={item.key}
              href={item.href}
              ref={(el) => {
                refs.current[item.key] = el;
              }}
              className="text-white hover:text-gray-300 h-8 flex items-center"
            >
              {item.label}
            </Link>
          ))}

          <span
            className="absolute bottom-[-6px] h-[3px] bg-primary transition-all duration-300 ease-out"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
          />
        </div>

        {/* Search and Profile */}
        <div className="flex items-center gap-4">
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
