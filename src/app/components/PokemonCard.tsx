import { useRouter } from "next/navigation";
import "../css/main.css";
import { useAppDispatch } from "../hooks";
import { MouseEvent } from "react";
import { fetchPokemonData } from "../redux/reducers/selectedPokemonReducer";
import { fetchPokemonDetailData } from "../redux/reducers/pokemonDetailReducer";
import { fetchPokemonChainData } from "../redux/reducers/pokemonChainReducer";

const PokemonCard = (pokemon: PokemonType) => {
  const pageSize = Number(process.env.NEXT_PUBLIC_POKEMON_PAGE_SIZE) || 10;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLDivElement>, pokemonName: string) => {
    router.push(`/pokemonDetail/${encodeURIComponent(pokemonName)}`);
    dispatch(fetchPokemonData(pokemonName));
    dispatch(fetchPokemonDetailData(pokemonName));
    dispatch(fetchPokemonChainData(pokemonName));
  };

  return (
    <div className={pageSize === 1 ? "col-lg-12" : "col-lg-6 col-md-6 mb-4"}>
      <div
        className="pokemon-card"
        onClick={(e) => {
          handleClick(e, pokemon.name);
        }}
        style={{ cursor: "pointer" }}
      >
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
    </div>
  );
};

export default PokemonCard;
