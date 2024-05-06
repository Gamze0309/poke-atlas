import "../css/pokemonDetail.css";
import { useAppSelector } from "../hooks";
const PokemonStatistics = () => {
  const pokemonDetailData = useAppSelector(
    (state) => state.pokemonDetailReducer.baseStatList
  );

  const calculateLength = (statNumber: number) => {
    const biggestCol = 9;
    let biggestStatNumber = pokemonDetailData[0].statNumber;
    pokemonDetailData.map(({ statNumber }) =>
      statNumber > biggestStatNumber ? (biggestStatNumber = statNumber) : null
    );

    const length = (statNumber * biggestCol) / biggestStatNumber;
    return Math.round(length);
  };
  return (
    <div className="row pokemon-info pokemon-stat">
      <div className="col">
        {pokemonDetailData.map((stat, index) => (
          <div key={index} className="row pokemon-detail-stat">
            <div className="col-md-3 col-auto pokemon-stat-name">
              <p>{stat.name}</p>
            </div>
            <div
              className={`col-md-${calculateLength(
                stat.statNumber
              )} pokemon-stat-number`}
            >
              <p>{stat.statNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStatistics;
