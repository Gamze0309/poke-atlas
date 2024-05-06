"use client";
import Pokemon from "../../components/Pokemon";
import PokemonAbilities from "../../components/PokemonAbilities";
import PokemonChain from "../../components/PokemonChain";
import PokemonStatistics from "../../components/PokemonStatistics";
import "../../css/pokemonDetail.css";
import withLayout from "@/app/components/withLayout";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Loading from "@/app/components/Loading";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { fetchPokemonData } from "@/app/redux/reducers/selectedPokemonReducer";
import { fetchPokemonDetailData } from "@/app/redux/reducers/pokemonDetailReducer";
import { fetchPokemonChainData } from "@/app/redux/reducers/pokemonChainReducer";

const PokemonDetailPage = () => {
  const param = useParams<{ pokemonName: string }>();
  let pokemonName = param.pokemonName;

  const dispatch = useAppDispatch();

  const pokemonData = useAppSelector((state) => state.selectedPokemonReducer);

  const pokemonDetail = useAppSelector((state) => state.pokemonDetailReducer);
  const pokemonChain = useAppSelector((state) => state.pokemonChainReducer);

  useEffect(() => {
    if (pokemonName != "undefined" && pokemonName != pokemonData.pokemon.name) {
      dispatch(fetchPokemonData(pokemonName));
      dispatch(fetchPokemonDetailData(pokemonName));
      dispatch(fetchPokemonChainData(pokemonName));
    }
  }, []);

  return (
    <div className="container pokemon-detail">
      <div className="row pokemon-detail-row">
        <div className="col-md-4">
          <h4>Pokemon</h4>
          {pokemonData.isLoading || pokemonData.status === "fail" ? (
            <Loading />
          ) : (
            <Pokemon />
          )}
          <h4>Abilities</h4>
          {pokemonDetail.isLoading || pokemonDetail.status === "fail" ? (
            <Loading />
          ) : (
            <PokemonAbilities />
          )}
        </div>
        <div className="col-md-8">
          <h4>Statistics</h4>
          {pokemonDetail.isLoading || pokemonDetail.status === "fail" ? (
            <Loading />
          ) : (
            <PokemonStatistics />
          )}
          <h4>Evolution</h4>
          {pokemonChain.isLoading || pokemonChain.status === "fail" ? (
            <Loading />
          ) : (
            <PokemonChain />
          )}
        </div>
      </div>
    </div>
  );
};

export default withLayout(PokemonDetailPage);
