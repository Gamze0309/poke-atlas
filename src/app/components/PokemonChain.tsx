import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks";
import { MouseEvent } from "react";
import { fetchPokemonData } from "../redux/reducers/selectedPokemonReducer";
import { fetchPokemonDetailData } from "../redux/reducers/pokemonDetailReducer";
import { fetchPokemonChainData } from "../redux/reducers/pokemonChainReducer";

const PokemonChain = () => {
  const pokemonData = useAppSelector(
    (state) => state.pokemonChainReducer.pokemons
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLDivElement>, pokemonName: string) => {
    router.push(`/pokemonDetail/${encodeURIComponent(pokemonName)}`);
    dispatch(fetchPokemonData(pokemonName));
    dispatch(fetchPokemonDetailData(pokemonName));
    dispatch(fetchPokemonChainData(pokemonName));
  };

  return (
    <div className="row pokemon-detail pokemon-info">
      {pokemonData.map((pokemon: PokemonType, index) => (
        <div key={index} className="col">
          <div
            className="pokemon-chain-card"
            onClick={(e) => {
              handleClick(e, pokemon.name);
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              className="pokemon-chain-pokemon-image"
              src={pokemon.image}
              alt={pokemon.name}
            />
            <p className="pokemon-chain-pokemon-name">{pokemon.name}</p>
            {pokemon.typeList.map((type) => (
              <span key={type} className="pokemon-chain-pokemon-type">
                {type}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonChain;
