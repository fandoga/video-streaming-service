# Netflix Project

This is a [Next.js](https://nextjs.org) project with TypeScript, Tailwind CSS, Redux Toolkit, RTK Query, shadcn/ui, ESLint, and Prettier.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit + RTK Query
- **UI Components**: shadcn/ui
- **Code Quality**: ESLint + Prettier

## Project Structure

This project follows a **feature-based architecture**:

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Redux provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind
├── features/              # Feature modules (feature-based architecture)
│   └── example/          # Example feature
│       ├── api/          # RTK Query API definitions
│       ├── slice/        # Redux slices
│       ├── components/   # Feature-specific components
│       ├── hooks/        # Feature-specific hooks
│       ├── types/        # Feature-specific types
│       ├── utils/        # Feature-specific utilities
│       └── index.ts      # Public API exports
├── shared/               # Shared code across features
│   ├── components/       # Shared components
│   ├── hooks/            # Shared hooks
│   ├── types/            # Shared types
│   └── utils/            # Shared utilities
├── components/           # Global components
│   ├── providers/        # Context providers (Redux, etc.)
│   └── ui/               # shadcn/ui components
├── lib/                  # Library code
│   ├── store.ts          # Redux store configuration
│   ├── hooks.ts          # Typed Redux hooks
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Getting Started

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Get your OMDB API key from [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)

3. Add your API key to `.env.local`:
```env
OMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

**Note:** `.env.local` is already in `.gitignore` and won't be committed to the repository.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Code Quality

Lint your code:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

Format your code with Prettier:

```bash
npm run format
```

Check formatting without making changes:

```bash
npm run format:check
```

## Redux Setup

The project uses Redux Toolkit with RTK Query. The store is configured in `lib/store.ts` and wrapped around the app in `app/layout.tsx`.

### Using Redux in Components

```typescript
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { increment } from "@/features/example";

export default function MyComponent() {
  const count = useAppSelector((state) => state.example.value);
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(increment())}>
      Count: {count}
    </button>
  );
}
```

### Using RTK Query

```typescript
import { useGetExampleQuery } from "@/features/example";

export default function MyComponent() {
  const { data, isLoading, error } = useGetExampleQuery(1);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return <div>{data?.name}</div>;
}
```

## Adding New Features

1. Create a new folder in `features/` with your feature name
2. Add the following structure:
   - `api/` - RTK Query API definitions
   - `slice/` - Redux slices (if needed)
   - `components/` - Feature components
   - `hooks/` - Feature hooks
   - `types/` - Feature types
   - `utils/` - Feature utilities
   - `index.ts` - Public exports
3. Register the feature in `lib/store.ts`:
   - Add reducer to the `reducer` object
   - Add API middleware if using RTK Query

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
