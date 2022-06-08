import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonSearch from './PokemonSearch';
import style from './ResultSearch.module.css'

function ResultSearch({cityName}){
    
    //FUNCTIONS TO GET THE DATA FROM THE API
    let getCityStatus = async (nameParam) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt_br&q=${nameParam}&appid=6899afdcd4372971c0a4f2b300368337`)
        return {
            name: response.data.name,
            climate: response.data.weather[0].description,
            temp: response.data.main.temp,
        }
    }
    let getPokemonType = async (typeParam) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeParam}`)
        return response.data.pokemon
    }
    
    //FUNCTION TO GET THE POKEMON TYPE
    function returnPokemonType(climate, temperature){
        if(climate === 'garoa de leve intensidade' || climate === 'chuva leve' || climate === 'chuva moderada' || climate === 'chuva'){
            return 'electric'
        }
        if(temperature < 5){
            return 'ice'
        }
        if(temperature >= 5 && temperature < 10){
            return 'water'
        }
        if(temperature >= 12 && temperature < 15){
            return 'grass'
        }
        if(temperature >= 15 && temperature < 21){
            return 'ground'
        }
        if(temperature >= 23 && temperature < 27){
            return 'bug'
        }
        if(temperature >= 27 && temperature <= 33){
            return 'rock'
        }
        if(temperature > 33){
            return 'fire'
        }
        return 'normal'
    }
    
    //STATE TO STORE THE DATA
    const [pokemonValues, setPokemonValues] = useState();
    const [cityValues, setCityValues] = useState();
    const [errorMessage, setErrorMessage] = useState();

    //EFFECT HOOK TO GET THE POKEMON TYPE
    useEffect(() => {
        if(cityName){
            let reqTimeOut = setTimeout(() => {
                getCityStatus(cityName).then(cityEl => {
                    setCityValues(cityEl)
                    getPokemonType(returnPokemonType(cityEl.climate, cityEl.temp)).then( pokemonEl => {
                        setPokemonValues(pokemonEl[Math.floor(Math.random() * pokemonEl.length + 1)].pokemon)
                    })
                    setErrorMessage()
                }
                ).catch(err => {
                    setCityValues()
                    setPokemonValues()
                    setErrorMessage('Cidade não encontrada')
                })
            }, 1000)
            return () => clearTimeout(reqTimeOut)
        }
    }, [cityName])
    
    return (
        <div className={style.result}>
        { pokemonValues && cityValues ?
            <div>
            <h3>{cityValues.name}</h3>
            <p>Clima: {cityValues.climate}, {cityValues.temp}°C</p>
            <PokemonSearch pokemonValues={pokemonValues}></PokemonSearch>
            </div>
            : ''
        }
        <p>{errorMessage}</p>
        </div>
        )
    }
    
    export default ResultSearch