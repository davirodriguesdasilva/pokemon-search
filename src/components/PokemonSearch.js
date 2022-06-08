import axios from 'axios';
import { useState } from 'react';

function PokemonSearch({pokemonValues}){

    //FUNCTIONS TO GET THE DATA FROM THE API
    let getPokemonImage = async (urlParam) => {
        const response = await axios.get(urlParam)
        return response.data.sprites 
    }

    //STATE TO STORE THE DATA
    const [pokemonImage, setPokemonImage] = useState();

    //FUNCTION TO GET THE POKEMON IMAGE
    getPokemonImage(pokemonValues.url).then(pokemonEl => {
        setPokemonImage(pokemonEl.front_default)
    })

    return(
        <div>
            <h2>{pokemonValues.name.toUpperCase()}</h2>
            { pokemonImage ? <img src={pokemonImage} alt={pokemonValues.name}></img> : <p>Sem imagem no sistema...</p> }
        </div>
    )
}

export default PokemonSearch