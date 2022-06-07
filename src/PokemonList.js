
import PokemonImage from "./PokemonImage"

export default function PokemonList({ pokemon }) {
    const mon = pokemon.map((p,index) => (
        <div className="mon" key={index}>
            <div className="pokemon-name">
                {p.name[0].toUpperCase() + p.name.substring(1)}
            </div>
            <div className="pokemon-image">
                <PokemonImage url={p.url}/>
            </div>
        </div>
    ))

    return (
        <div className="pokemon-list">
            {mon}
        </div>
    )
}
        
