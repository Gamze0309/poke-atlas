"use client";
import Pokemon from "../../components/Pokemon";
import PokemonAbilities from "../../components/PokemonAbilities";
import PokemonChain from "../../components/PokemonChain";
import PokemonStatistics from "../../components/PokemonStatistics";
import "../../css/pokemonDetail.css";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";

const PokemonDetailPage = () => {
  const pokemonData = useAppSelector((state) => state.selectedPokemonReducer);
  const pokemonDetail = useAppSelector((state) => state.pokemonDetailReducer);
  const pokemonChain = useAppSelector((state) => state.pokemonChainReducer);

  return (
    <>
      <Header />
      <div className="container pokemon-detail">
        <div className="row pokemon-detail-row">
          <div className="col-md-4">
            <h4>Pokemon</h4>
            {pokemonData.status !== "success" ? <Loading /> : <Pokemon />}
            <h4>Abilities</h4>
            {pokemonDetail.status !== "success" ? (
              <Loading />
            ) : (
              <PokemonAbilities />
            )}
          </div>
          <div className="col-md-8">
            <h4>Statistics</h4>
            {pokemonDetail.status !== "success" ? (
              <Loading />
            ) : (
              <PokemonStatistics />
            )}
            <h4>Evolution</h4>
            {pokemonChain.status !== "success" ? <Loading /> : <PokemonChain />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetailPage;
