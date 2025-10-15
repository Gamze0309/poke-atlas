import "../css/main.css";
import { setSelectedPokemon } from "../redux/reducers/selectedPokemonReducer";
import { useAppDispatch } from "../hooks";
import { fetchPokemonDetailData } from "../redux/reducers/pokemonDetailReducer";
import { fetchPokemonChainData } from "../redux/reducers/pokemonChainReducer";
import Link from "next/link";

const PokemonCard = (pokemon: PokemonType) => {
  const dispatch = useAppDispatch();
  const pageSize = Number(process.env.NEXT_PUBLIC_POKEMON_PAGE_SIZE) || 10;

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
            {pokemon.typeList.map((type) => (
              <span key={type} className="pokemon-type">
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
