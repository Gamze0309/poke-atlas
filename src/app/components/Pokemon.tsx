import { useAppDispatch, useAppSelector } from "../hooks";
import "../css/pokemonDetail.css";
import PokemonInfo from "./PokemonInfo";
import { useEffect } from "react";
const Pokemon = () => {
  const pokemonData = useAppSelector(
    (state) => state.selectedPokemonReducer.pokemon
  );

  useEffect(() => {}, []);
  return (
    <div className="pokemon-info pokemon">
      <div className="row">
        <img
          className="pokemon-image"
          src={pokemonData.image}
          alt={pokemonData.name}
        />
      </div>
      <div className="row">
        <div id="pokemon-name-row">
          <h3 className="pokemon-detail-name">{pokemonData.name}</h3>
        </div>
        <div className="pokemon-detail-type-list">
          {pokemonData.typeList.map((type, index) => (
            <span key={index} className="pokemon-detail-type">
              {type}
            </span>
          ))}
        </div>
        <PokemonInfo />
      </div>
    </div>
  );
};

export default Pokemon;
