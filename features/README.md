# Features

This directory follows a feature-based architecture. Each feature is self-contained and includes:

- `api/` - RTK Query API definitions
- `slice/` - Redux slices
- `components/` - Feature-specific components
- `hooks/` - Feature-specific hooks
- `types/` - Feature-specific types
- `utils/` - Feature-specific utilities
- `index.ts` - Public API exports

## Example Feature Structure

```
features/
  example/
    api/
      exampleApi.ts
    slice/
      exampleSlice.ts
    components/
      ExampleComponent.tsx
    hooks/
      useExample.ts
    types/
      example.types.ts
    utils/
      example.utils.ts
    index.ts
```
