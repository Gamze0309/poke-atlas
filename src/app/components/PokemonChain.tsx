import { useAppSelector } from "../hooks";
import Link from "next/link";

const PokemonChain = () => {
  const pokemonData = useAppSelector(
    (state) => state.pokemonChainReducer.pokemons
  );

  return (
    <div className="row pokemon-detail pokemon-info">
      {pokemonData.map((pokemon: PokemonType, index) => (
        <div key={index} className="col">
          <Link
            className="pokemon-chain-card"
            href={`/pokemonDetail/${encodeURIComponent(pokemon.name)}`}
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
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonChain;
