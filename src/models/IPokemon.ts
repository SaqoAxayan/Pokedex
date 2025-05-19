export interface PokemonApi {
  name: string;
  url: string;
}

export interface PokemonEvolution {
  species: {
    url: string;
    name: string;
  };
  evolves_to: PokemonEvolution[];
}

export interface BastState {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonIndividualProps {
  imgUrl: string;
  evolutionPokemon: PokemonEvolution[];
  stats: BastState[];
  id: number | null;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonApi[];
}

export interface PokemonDetail {
  abilities: {
    [0]: {
      ability: {
        name: string;
      };
    };
  };
  name: string;
  weight: number;
  height: number;
  id: number;
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];

  stats: BastState[];
}

export interface PokemonState {
  page: number;
  limit: number;
  arrowBul: boolean;
  pages: any[];
}

export interface Flavor {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

export interface Genera {
  genus: string;
  language: {
    name: string;
  };
}


export interface PokemonSpecies {
  flavor_text_entries: Flavor[];
  gender_rate: number;
  genera: Genera[];
  evolution_chain: {
     url: string 
  }
}
