import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonDetail, PokemonEvolution, PokemonResponse, PokemonSpecies } from "../models/IPokemon.ts";

export const pokemonAPI = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2",
  }),
  endpoints: (build) => ({
    fetchAllPokemon: build.query< PokemonResponse, { page: number; limit: number } >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "pokemon",
        params: {
          offset: (page - 1) * limit,
          limit,
        },
      }),
    }),
    fetchPokemonByUrl: build.query<PokemonDetail, { url: string }>({
      query: (url) => url,
    }),

    getPokemonByName: build.query<PokemonDetail, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonSpecies: build.query<PokemonSpecies , string>({
      query: (name) => `pokemon-species/${name}`,
    }),
    getEvolutionChain: build.query<PokemonEvolution, string>({
      query: (url) => url.replace("https://pokeapi.co/api/v2/", ""),
    }),
  }),
});

export const {
  useFetchAllPokemonQuery,
  useFetchPokemonByUrlQuery,
  useGetPokemonByNameQuery,
  useGetPokemonSpeciesQuery,
  useGetEvolutionChainQuery,
} = pokemonAPI;
