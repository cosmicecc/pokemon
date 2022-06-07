
export default function PokemonList({ pokemon }) {
    const mon = pokemon.map((p,index) => (
        <div className="mon" key={index}>
            <div className="pokemon-name">
                {p.name[0].toUpperCase() + p.name.substring(1)}
            </div>
            <div className="pokemon-image">
                <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${p.name}.jpg`}/>
            </div>
        </div>
    ))

    return (
        <div className="pokemon-list">
            {mon}
        </div>
    )
}
        
