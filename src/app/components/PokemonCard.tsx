import "../css/main.css";
import Link from "next/link";

const PokemonCard = (pokemon: PokemonType) => {
  const pageSize = Number(process.env.NEXT_PUBLIC_POKEMON_PAGE_SIZE) || 10;

  return (
    <div className={pageSize === 1 ? "col-lg-12" : "col-lg-6 col-md-6 mb-4"}>
      <Link href={`/pokemonDetail/${encodeURIComponent(pokemon.name)}`}>
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
