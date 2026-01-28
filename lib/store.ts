import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import exampleReducer from "@/features/example/slice/exampleSlice";
import { moviesApi } from "@/features/movies/api/moviesApi";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      example: exampleReducer,
      // RTK Query APIs
      [moviesApi.reducerPath]: moviesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [],
        },
      }).concat(moviesApi.middleware),
  });

  // Enable refetchOnFocus and refetchOnReconnect behaviors
  setupListeners(store.dispatch);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
