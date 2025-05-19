import React, { useState } from "react";
import { useFetchAllPokemonQuery } from "../../services/PokemonApi.ts";
import PokemonDetails from "../PokemonCard/PokemonCard.tsx";
import styles from "./PokemonList.module.scss";
import arrowImg from "../../assets/arrow.png";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  setLimit,
  setPage,
  toggleArrow,
} from "../../store/reducers/PokemonSlice.ts";

const PokemonList: React.FC = () => {
  const { limit, page, arrowBul, pages } = useAppSelector(
    (state) => state.pokemonReducer
  );
  const { data, error, isLoading } = useFetchAllPokemonQuery({ page, limit });
  const dispatch = useAppDispatch();
  const limitPending = (event) => dispatch(setLimit(event.target.innerText));

  const pendingPage = pages.map((num) => (
    <div
      onClick={() => {
        dispatch(setPage(num));
      }}
      key={num}
      style={{
        backgroundColor: page === num ? "#397f84" : "transparent",
        color: page === num ? "white" : "#397f84",
      }}
    >
      {num}
    </div>
  ));

  return (
    <section className={styles.globalContainer}>
      <h1>Pokedex</h1>
      <div className={styles.response}>
        <div></div>
        <div></div>
        <div></div>
        <div className={styles.limitContainer}>
          <p>Show per page:</p>
          <div className={styles.limitGlobalCont}>
            <div
              className={styles.firstCont}
              onClick={() => dispatch(toggleArrow())}
              style={{
                boxShadow: arrowBul ? "" : "rgba(0, 0, 0, 0.35) 0px 2px 9px",
              }}
            >
              <p className={styles.myLimitText}>{limit}</p>
              <img
                className={arrowBul ? styles.rotated2 : styles.rotated}
                src={arrowImg}
                alt=""
              />
            </div>
            <div
              className={styles.secondCont}
              onClick={(event) => limitPending(event)}
              style={{ display: arrowBul ? "none" : "flex" }}
            >
              <div>
                <p>10</p>
              </div>
              <div>
                <p>20</p>
              </div>
              <div>
                <p>50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pokemonList}>
        {data?.results?.map((pokemon) => (
          <PokemonDetails key={pokemon.name} url={pokemon.url} />
        ))}
      </div>
      <div className={styles.pages}>
        <div>Prev.</div>
        {pendingPage}
        <div>Next.</div>
      </div>
    </section>
  );
};

export default PokemonList;
