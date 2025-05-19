import React from "react";
import { useFetchPokemonByUrlQuery } from "../../services/PokemonApi.ts";
import { useNavigate } from "react-router-dom";
import styles from "./Pokemon.module.scss";

interface PokemonDetailsProps {
  url: string;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ url }) => {
  const { data, error, isLoading } = useFetchPokemonByUrlQuery({ url });
  
  const imgUrl =
    data?.sprites?.other?.["official-artwork"]?.front_default ||
    "https://via.placeholder.com/150";
  const pokemonId: string | undefined = `#${String(data?.id || "").padStart(4, "0")}`;
  const navigate = useNavigate();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) return <p>Error loading Pokémon details</p>;

  
  return (
    <div
      className={styles.pokemon}
      onClick={() => navigate(`/pokemon/${data?.name}`)}
    >
      <div className={styles.infoUrl}>
        <img src={imgUrl} alt={data?.name} />
      </div>
      <p className={styles.pokemonName}>{data?.name}</p>
      <p className={styles.pokemonId}>{pokemonId}</p>
      <p className={styles.pokemonTypes}>
        {data?.types[0]?.type?.name}, {data?.types[1]?.type?.name}
      </p>
    </div>
  );
};

export default PokemonDetails;
