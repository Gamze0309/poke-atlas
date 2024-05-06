import { useAppDispatch, useAppSelector } from "../hooks";
import Link from "next/link";
import { setSelectedPokemon } from "../redux/reducers/selectedPokemonReducer";
import { fetchPokemonDetailData } from "../redux/reducers/pokemonDetailReducer";
import { fetchPokemonChainData } from "../redux/reducers/pokemonChainReducer";

const PokemonChain = () => {
  const pokemonData = useAppSelector(
    (state) => state.pokemonChainReducer.pokemons
  );
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent, pokemon: PokemonType) => {
    dispatch(
      setSelectedPokemon({
        pokemon: {
          name: pokemon.name,
          image: pokemon.image,
          typeList: pokemon.typeList,
        },
      })
    );
    dispatch(fetchPokemonDetailData(pokemon.name));
    dispatch(fetchPokemonChainData(pokemon.name));
  };

  return (
    <div className="row pokemon-detail pokemon-info">
      {pokemonData.map((pokemon: PokemonType, index) => (
        <div key={index} className="col">
          <Link
            className="pokemon-chain-card"
            href={`/pokemonDetail/${encodeURIComponent(pokemon.name)}`}
            onClick={(e) => handleClick(e, pokemon)}
          >
            <img
              className="pokemon-chain-pokemon-image"
              src={pokemon.image}
              alt={pokemon.name}
            />
            <p className="pokemon-chain-pokemon-name">{pokemon.name}</p>
            {pokemon.typeList.map((type, index) => (
              <span key={index} className="pokemon-chain-pokemon-type">
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
