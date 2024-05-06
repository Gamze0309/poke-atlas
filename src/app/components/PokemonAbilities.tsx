import "../css/pokemonDetail.css";
import { useAppSelector } from "../hooks";
const PokemonAbilities = () => {
  const pokemonDetailData = useAppSelector(
    (state) => state.pokemonDetailReducer.abilityList
  );

  return (
    <div className="pokemon-info pokemon-ability">
      {pokemonDetailData.map((ability, index) => (
        <span
          key={index}
          className={
            ability.isHidden
              ? "row pokemon-detail-ability hidden-ability"
              : "row pokemon-detail-ability"
          }
        >
          {ability.name}
          {ability.isHidden ? " (hidden)" : ""}
        </span>
      ))}
    </div>
  );
};

export default PokemonAbilities;
