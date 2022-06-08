
import { useEffect, useState } from 'react';
import axios from 'axios';

function ResultSearch({cityName}){
    
    let getCityStatus = async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt_br&q=${cityName}&appid=6899afdcd4372971c0a4f2b300368337`)
        return {
            name: response.data.name,
            climate: response.data.weather[0].description,
            temp: response.data.main.temp,
        }
    }
    
    let getPokemonType = async (elementType) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${elementType}`)
        return response.data.pokemon
    }
    
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
    
    useEffect(() => {
        
        let reqTimeOut = setTimeout(() => {
            
            getCityStatus().then(cityEl => {
                getPokemonType(returnPokemonType(cityEl.climate, cityEl.temp)).then( pokemons => {
                    console.log(pokemons[Math.floor(Math.random() * pokemons.length + 1)])
                })
            }
            )
            
        }, 1000)
        return () => clearTimeout(reqTimeOut)
        
    }, [cityName])
    
    return (
        <div>
        
        
        </div>
        )
    }
    
    export default ResultSearch