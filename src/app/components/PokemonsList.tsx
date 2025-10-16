"use client";
import { useEffect } from "react";
import { fetchPokemonsData } from "../redux/reducers/pokemonListReducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import PokemonCard from "./PokemonCard";
import "../css/main.css";
import Pagination from "./Pagination";
import { useParams } from "next/navigation";
import Loading from "./Loading";

const PokemonsList = () => {
  const dispatch = useAppDispatch();

  const pokemonData = useAppSelector((state) => state.pokemonListReducer);

  const param = useParams<{ pageNumber: string }>();
  let pageNumber = Number(param.pageNumber ?? 1);

  let pageSize = Number(process.env.NEXT_PUBLIC_POKEMON_PAGE_SIZE) || 10;

  if (isNaN(pageSize) || pageSize <= 0 || !Number.isInteger(pageSize)) {
    pageSize = 10;
  }

  const totalPages = Math.ceil(pokemonData.count / pageSize);

  useEffect(() => {
    let offset: number = (pageNumber - 1) * pageSize;
    dispatch(fetchPokemonsData({ offset, pageSize }));
  }, [pageNumber]);

  return (
    <div className="container main-container">
      {pokemonData.status !== "success" ? (
        <Loading />
      ) : (
        <div className="row">
          {pokemonData.pokemons?.map((pokemon: PokemonType) => (
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
