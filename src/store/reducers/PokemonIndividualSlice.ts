import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BastState,
  PokemonEvolution,
  PokemonIndividualProps,
} from "../../models/IPokemon";

const initialState: PokemonIndividualProps = {
  imgUrl: "",
  evolutionPokemon: [],
  stats: [],
  id: null,
};
const IndividualReducer = createSlice({
  initialState,
  name: "individual",
  reducers: {},
});

export default IndividualReducer;
