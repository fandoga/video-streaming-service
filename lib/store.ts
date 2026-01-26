import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { exampleApi } from "@/features/example/api/exampleApi";
import exampleReducer from "@/features/example/slice/exampleSlice";
import { moviesApi } from "@/features/movies/api/moviesApi";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      // Feature reducers
      example: exampleReducer,
      // RTK Query APIs
      [exampleApi.reducerPath]: exampleApi.reducer,
      [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [],
        },
      }).concat(exampleApi.middleware, moviesApi.middleware),
  });

  // Enable refetchOnFocus and refetchOnReconnect behaviors
  setupListeners(store.dispatch);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
