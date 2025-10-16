"use client";
import Pokemon from "../../components/Pokemon";
import PokemonAbilities from "../../components/PokemonAbilities";
import PokemonChain from "../../components/PokemonChain";
import PokemonStatistics from "../../components/PokemonStatistics";
import "../../css/pokemonDetail.css";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";
import { useEffect } from "react";
import { fetchPokemonData } from "@/app/redux/reducers/selectedPokemonReducer";
import { fetchPokemonDetailData } from "@/app/redux/reducers/pokemonDetailReducer";
import { fetchPokemonChainData } from "@/app/redux/reducers/pokemonChainReducer";
import { useParams } from "next/navigation";

const PokemonDetailPage = () => {
  const param = useParams<{ pokemonName: string }>();
  let pokemonName = param.pokemonName;

  const dispatch = useAppDispatch();

  const pokemonData = useAppSelector((state) => state.selectedPokemonReducer);

  const pokemonDetail = useAppSelector((state) => state.pokemonDetailReducer);
  const pokemonChain = useAppSelector((state) => state.pokemonChainReducer);

  useEffect(() => {
    if (
      pokemonName != "undefined" &&
      pokemonName != pokemonData?.pokemon?.name
    ) {
      dispatch(fetchPokemonData(pokemonName));
      dispatch(fetchPokemonDetailData(pokemonName));
      dispatch(fetchPokemonChainData(pokemonName));
    }
  }, [param.pokemonName, dispatch]);

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
