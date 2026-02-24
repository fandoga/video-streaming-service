"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchMoviesQuery } from "@/features/movies/api/moviesApi";
import type { Movie } from "@/features/movies/types/movies.types";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";

interface SearchBarProps {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const shouldQuery = searchQuery.trim().length >= 2;

  const { data, isLoading } = useSearchMoviesQuery(
    { query: searchQuery },
    { skip: !shouldQuery }
  );

  // Когда строка поиска пустая (в том числе после закрытия комбобокса),
  // просто не показываем элементы, даже если в кэше ещё есть данные
  const items: Movie[] = shouldQuery ? (data?.movies ?? []) : [];

  return (
    <Combobox
      items={items}
      onInputValueChange={(value) => {
        setSearchQuery(value);
      }}
      onOpenChange={(open) => {
        if (!open) {
          setSearchQuery("");
        }
      }}
      onValueChange={(movie) => {
        const selected = movie as Movie | null;
        if (!selected) return;

        router.push(`/movies/${selected.id}`);
        setSearchQuery("");
        onClose?.();
      }}
    >
      <ComboboxInput
        className={""}
        placeholder="Search..."
        showTrigger={false}
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>
          {isLoading
            ? "Loading..."
            : searchQuery.trim().length < 2
              ? "start typing"
              : "Nothing found"}
        </ComboboxEmpty>
        <ComboboxList>
          {(item: Movie) => (
            <ComboboxItem key={item.id} value={item}>
              <div className="flex flex-col cursor-pointer">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">
                  {item.releaseDate}
                </span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
