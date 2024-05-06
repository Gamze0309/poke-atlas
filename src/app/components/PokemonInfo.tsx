import "../css/pokemonDetail.css";
import { useAppSelector } from "../hooks";

const PokemonInfo = () => {
  const pokemonDetailData = useAppSelector(
    (state) => state.pokemonDetailReducer
  );

  function cleanString(input: string): string {
    const cleanedString = input.replace(/\n|\t|\f/g, " ");
    return cleanedString;
  }

  return (
    <>
      <div className="pokemon-detail-description">
        <p>{cleanString(pokemonDetailData.description)}</p>
      </div>
      <div className="pokemon-detail-body-list">
        <div className="col pokemon-height">
          <p>Height</p>
          <span className="pokemon-detail-body">
            {pokemonDetailData.height / 10} m
          </span>
        </div>
        <div className="col pokemon-weight">
          <p>Weight</p>
          <span className="pokemon-detail-body">
            {pokemonDetailData.weight / 10} kg
          </span>
        </div>
      </div>
    </>
  );
};

export default PokemonInfo;
