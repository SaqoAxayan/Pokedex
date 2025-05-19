import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pokemonAPI } from "../services/PokemonApi.ts";
import pokemonReducer from "./reducers/PokemonSlice.ts";
import PokemonIndividual from "../components/PokemonIndividual/PokemonIndividual.tsx";
import IndividualReducer from "./reducers/PokemonIndividualSlice.ts";

const rootReducer = combineReducers({
  pokemonReducer: pokemonReducer.reducer,
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
  PokemonIndividual: IndividualReducer.reducer
});

export const setUpStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["pokemonAPI/fulfillWithMeta"],
          ignoredPaths: ["pokemonReducer"],
          warnAfter: 1000,
        },
      }).concat(pokemonAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore["dispatch"];
