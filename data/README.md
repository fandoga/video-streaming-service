# Mock Data

Этот каталог содержит временные mock данные для разработки.

## movies.json

JSON файл с данными о фильмах. Используется API routes в `app/api/movies/` для эмуляции реального API.

### Структура данных

```json
{
  "movies": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "posterUrl": "string",
      "backdropUrl": "string",
      "releaseDate": "string",
      "rating": "number",
      "genres": ["string"],
      "duration": "number"
    }
  ]
}
```

## Использование

Mock API доступен через Next.js API routes:

- `GET /api/movies` - список фильмов (с пагинацией, фильтрацией и поиском)
- `GET /api/movies/[id]` - фильм по ID

### Параметры запроса для `/api/movies`:

- `page` - номер страницы (по умолчанию: 1)
- `limit` - количество фильмов на странице (по умолчанию: 12)
- `genre` - фильтр по жанру
- `q` - поисковый запрос

### Примеры:

```
GET /api/movies
GET /api/movies?page=1&limit=20
GET /api/movies?genre=Драма
GET /api/movies?q=интерстеллар
GET /api/movies/1
```

## Замена на реальный API

Когда будет готов реальный API, нужно обновить `baseUrl` в `features/movies/api/moviesApi.ts`:

```typescript
baseQuery: fetchBaseQuery({
  baseUrl: "https://your-real-api.com/api",
}),
```

И удалить API routes из `app/api/movies/`.
