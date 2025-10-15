"use client";
import { useEffect, useState } from "react";
import {
  fetchPokemonsData,
  setPokemonListInitialState,
} from "../redux/reducers/pokemonListReducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import PokemonCard from "./PokemonCard";
import "../css/main.css";
import Pagination from "./Pagination";
import { useParams } from "next/navigation";
import Loading from "./Loading";

const PokemonsList = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const pokemonData = useAppSelector((state) => state.pokemonListReducer);
  const param = useParams<{ pageNumber: string }>();
  let pageNumber = parseInt(
    typeof param.pageNumber === "undefined" ? "1" : param.pageNumber,
    10
  );

  let pageSize = parseInt(
    process.env.NEXT_PUBLIC_POKEMON_PAGE_SIZE || "10",
    10
  );

  if (isNaN(pageSize) || pageSize <= 0 || !Number.isInteger(pageSize)) {
    pageSize = 10;
  }

  const totalPages = Math.ceil(pokemonData.count / pageSize);

  useEffect(() => {
    setIsLoading(true);
    let offset: number = (pageNumber - 1) * pageSize;
    dispatch(fetchPokemonsData({ offset, pageSize })).then(() => {
      setIsLoading(false);
    });
    return () => {
      dispatch(setPokemonListInitialState());
    };
  }, [dispatch, pageNumber]);

  return (
    <div className="container main-container">
      {isLoading || pokemonData.status === "fail" ? (
        <Loading />
      ) : (
        <div className="row">
          {pokemonData.pokemons?.map((pokemon) => (
            <PokemonCard key={pokemon.name} {...pokemon} />
          ))}
          <div className="col pagination-style">
            <Pagination totalPages={totalPages} currentPage={pageNumber} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonsList;
