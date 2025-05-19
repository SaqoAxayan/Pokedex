import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonState } from "../../models/IPokemon.ts";

const initialState: PokemonState = {
  page: 1,
  limit: 20,
  arrowBul: true,
  pages: [1, 2, 3, 4, 5, 6, 7],
};

const pokemonReducer = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    toggleArrow: (state) => {
      state.arrowBul = !state.arrowBul;
    },
    setPages : (state, action: PayloadAction<number>) => {
      
    },
    
  },
});

export const { setPage, setLimit, toggleArrow ,setPages} = pokemonReducer.actions;
export default pokemonReducer;
