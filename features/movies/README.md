# Movies Feature

Feature для работы с фильмами используя RTK Query.

## API Endpoints

Все endpoints используют базовый URL: `https://mock-api/api/` (можно заменить в `api/moviesApi.ts`)

### 1. getMovies

Получение списка фильмов с пагинацией и фильтрацией.

```typescript
import { useGetMoviesQuery } from "@/features/movies";

// Базовое использование
const { data, isLoading, error } = useGetMoviesQuery();

// С параметрами
const { data, isLoading, error } = useGetMoviesQuery({
  page: 1,
  limit: 20,
  genre: "action",
});
```

**Параметры:**
- `page?: number` - номер страницы
- `limit?: number` - количество фильмов на странице
- `genre?: string` - фильтр по жанру

**Возвращает:**
- `data: MoviesResponse` - список фильмов с метаданными
- `isLoading: boolean` - состояние загрузки
- `error: FetchBaseQueryError | SerializedError` - ошибка (если есть)
- `isFetching: boolean` - состояние обновления данных

### 2. getMovieById

Получение информации о конкретном фильме по ID.

```typescript
import { useGetMovieByIdQuery } from "@/features/movies";

const { data, isLoading, error } = useGetMovieByIdQuery(movieId);
```

**Параметры:**
- `movieId: string` - ID фильма

**Возвращает:**
- `data: Movie` - информация о фильме
- `isLoading: boolean` - состояние загрузки
- `error: FetchBaseQueryError | SerializedError` - ошибка (если есть)

### 3. searchMovies

Поиск фильмов по запросу.

```typescript
import { useSearchMoviesQuery } from "@/features/movies";

const { data, isLoading, error } = useSearchMoviesQuery({
  query: "batman",
  page: 1,
});
```

**Параметры:**
- `query: string` - поисковый запрос
- `page?: number` - номер страницы (по умолчанию 1)

**Возвращает:**
- `data: MoviesResponse` - результаты поиска
- `isLoading: boolean` - состояние загрузки
- `error: FetchBaseQueryError | SerializedError` - ошибка (если есть)
- `isFetching: boolean` - состояние обновления данных

## Lazy Queries

Для запросов по требованию (например, при клике на кнопку):

```typescript
import { useLazyGetMoviesQuery } from "@/features/movies";

const [trigger, { data, isLoading, error }] = useLazyGetMoviesQuery();

// Вызов при необходимости
const handleClick = () => {
  trigger({ page: 1 });
};
```

## Кеширование

RTK Query автоматически кеширует данные:
- Данные кешируются на 60 секунд (по умолчанию)
- При повторном запросе используются кешированные данные
- Кеш инвалидируется при использовании тегов (tags)

## Примеры использования

### Компонент со списком фильмов

```typescript
"use client";

import { useGetMoviesQuery } from "@/features/movies";

export default function MoviesPage() {
  const { data, isLoading, error } = useGetMoviesQuery({ page: 1 });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {JSON.stringify(error)}</div>;

  return (
    <div>
      {data?.movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
}
```

### Компонент с деталями фильма

```typescript
"use client";

import { useGetMovieByIdQuery } from "@/features/movies";

export default function MoviePage({ movieId }: { movieId: string }) {
  const { data, isLoading, error } = useGetMovieByIdQuery(movieId);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка</div>;
  if (!data) return <div>Фильм не найден</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}
```

## Готовые компоненты

В feature включены готовые компоненты:
- `MoviesList` - список фильмов с обработкой loading/error
- `MovieDetails` - детальная информация о фильме
- `SearchMovies` - поиск фильмов с формой

```typescript
import { MoviesList, MovieDetails, SearchMovies } from "@/features/movies";

// Использование
<MoviesList />
<MovieDetails movieId="123" />
<SearchMovies />
```
