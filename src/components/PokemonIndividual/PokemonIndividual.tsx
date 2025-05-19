import React, { JSX, useEffect, useState } from "react";
import {
  useGetEvolutionChainQuery,
  useGetPokemonByNameQuery,
  useGetPokemonSpeciesQuery,
} from "../../services/PokemonApi.ts";
import { useParams } from "react-router-dom";
import styles from "./PokemonIndividual.module.scss";
import {
  BastState,
  Flavor,
  PokemonDetail,
  PokemonEvolution,
  PokemonSpecies,
} from "../../models/IPokemon.ts";
import PokemonDetails from "../PokemonCard/PokemonCard.tsx";

const PokemonIndividual: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const {
    data: pokemon,
    error,
    isLoading: pokemonLoading,
  } = useGetPokemonByNameQuery(name!);
  const { data: speciesData, isLoading: loadingSpecies } =
    useGetPokemonSpeciesQuery(name!);
  const evolutionUrl: string | undefined = speciesData?.evolution_chain?.url;
  const { data: evolution, isLoading: evolutionLoading } =
    useGetEvolutionChainQuery(evolutionUrl ?? "", { skip: !evolutionUrl });
  const pokemonImage: string | undefined =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default;
  const [evolutionElements, setEvolutionElements] = useState<
    JSX.Element[] | null
  >(null);
  const [statsElements, setStatsElements] = useState<JSX.Element[] | any[]>([]);
  const [pokemonCategories, setPokemonCategories] = useState<any[]>([]);

  const pokemonId: string | undefined = `#${String(pokemon?.id).padStart(
    4,
    "0"
  )}`;
  const [pokemonVersion, setPokemonVersion] = useState<string | undefined>("");

  const chainEvolution = (el: PokemonEvolution): JSX.Element[] => {
    const arr: JSX.Element[] = [];
    let url = el.species?.url?.replace("pokemon-species", "pokemon");
    arr.push(<PokemonDetails key={url} url={url} />);
  
    if (el.evolves_to.length > 0) {
      el.evolves_to.forEach((key: PokemonEvolution) => {
        arr.push(...chainEvolution(key));
      });
    }
    return arr;
  };
  
  const statsRendering = (stats: BastState[]) => {
    return stats.map((el) => {
      const bast = Math.ceil(el.base_stat / 17);
      const name = el.stat.name;
      return (
        <div key={Math.random()}>
          <div key={Math.random()}>
            {Array.from({ length: 15 }, (_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: index > bast ? "#f1f1f1" : " #397f84",
                }}
              ></div>
            ))}
          </div>
          <p>{name}</p>
        </div>
      );
    });
  };

  const categories = (pokemon: PokemonDetail) => {
    const heightCm = pokemon.height * 10;
    const heightInches = heightCm / 2.54;
    const foot = Math.floor(heightInches / 12);
    const inches = Math.round(heightInches % 12);
    const height = `${foot}' ${inches < 10 ? `0${inches}` : inches}"`;

    const weight = `${
      Math.round((pokemon.weight / 10) * 2.20462 * 10) / 10
    } lbs`;
    const type = pokemon.types.map((t) => t.type.name).join(" ");
    const ability = pokemon.abilities[0]?.ability.name || "Unknown";

    return [
      { key: "Height", value: height },
      { key: "Weight", value: weight },
      { key: "Type", value: type },
      { key: "Abilities", value: ability },
    ];
  };

  const speciesCategories = (prev, data: PokemonSpecies) => {
    const genera =
      data.genera
        .find((el) => el.language.name === "en")
        ?.genus.replace(" Pokémon", "") || "Unknown";
    const gender =
      data.gender_rate === 0
        ? "male"
        : data.gender_rate === 8
        ? "female"
        : "female male";
    return [
      ...prev,
      { key: "Gen", value: genera },
      { key: "Gender", value: gender },
    ];
  };

  const speciesVersion = (flavor: Flavor[]) => {
    const version = flavor.find(
      (el) => el.version.name === "diamond" && el.language.name === "en"
    )?.flavor_text;

    return version;
  };
  console.log(evolution);

  useEffect(() => {
    if (!evolutionLoading && evolution) {
      setEvolutionElements(chainEvolution(evolution.chain));
    }
  }, [evolution, evolutionLoading]);

  useEffect(() => {
    if (!pokemonLoading && !loadingSpecies && pokemon && speciesData) {
      setStatsElements(statsRendering(pokemon.stats));
      const baseCategories = categories(pokemon);
      const speciesCategory = speciesCategories([], speciesData);
      setPokemonCategories([...baseCategories, ...speciesCategory]);
      setPokemonVersion(speciesVersion(speciesData.flavor_text_entries));
    }
  }, [pokemon, pokemonLoading, speciesData, loadingSpecies]);

  const pendingCategories =
    pokemonCategories.length > 0
      ? pokemonCategories.map((el) => (
          <div key={Math.random()}>
            <h4>{el.key}</h4>
            <p>{el.value}</p>
          </div>
        ))
      : null;

  if (pokemonLoading || evolutionLoading || loadingSpecies) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className={styles.individualCont}>
      <h1>
        {pokemon?.name} {pokemonId}
      </h1>
      <div className={styles.informationCont}>
        <div className={styles.leftSideCont}>
          <img src={pokemonImage} alt="" />
        </div>
        <div className={styles.rightSideCont}>
          <div className={styles.infoText}>{pokemonVersion}</div>
          <div className={styles.power}>{pendingCategories}</div>
          <div className={styles.stats}>
            <h1>stats</h1>
            <div className={styles.myGlobalContStats}>{statsElements}</div>
          </div>
        </div>
      </div>
      <h2>Evolutions</h2>
      <div className={styles.evolutionCont}>{evolutionElements}</div>
    </div>
  );
};

export default PokemonIndividual;
