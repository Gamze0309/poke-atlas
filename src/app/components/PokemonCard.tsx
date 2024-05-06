import "../css/main.css";
import {
  setSelectedPokemon,
  setSelectedPokemonInitialState,
} from "../redux/reducers/selectedPokemonReducer";
import { useAppDispatch } from "../hooks";
import {
  fetchPokemonDetailData,
  setPokemonDetailInitialState,
} from "../redux/reducers/pokemonDetailReducer";
import {
  fetchPokemonChainData,
  setPokemonChainInitialState,
} from "../redux/reducers/pokemonChainReducer";
import Link from "next/link";
import { useEffect } from "react";

const PokemonCard = (pokemon: PokemonType) => {
  const dispatch = useAppDispatch();
  const pageSize = parseInt(
    process.env.NEXT_PUBLIC_POKEMON_PAGE_SIZE || "10",
    10
  );

  useEffect(() => {
    dispatch(setSelectedPokemonInitialState());
    dispatch(setPokemonDetailInitialState());
    dispatch(setPokemonChainInitialState());
  }, []);
  const handleClick = () => {
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
    <div className={pageSize === 1 ? "col-lg-12" : "col-lg-6 col-md-6 mb-4"}>
      <Link
        href={`/pokemonDetail/${encodeURIComponent(pokemon.name)}`}
        onClick={handleClick}
      >
        <div className="pokemon-card">
          <h3 className="pokemon-name">{pokemon.name}</h3>
          <div className="image-container">
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
          <div className="type-list">
            {pokemon.typeList.map((type, index) => (
              <span key={index} className="pokemon-type">
                {type}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
