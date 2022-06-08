import { useState } from 'react';
import './App.css';
import ResultSearch from './components/ResultSearch';
import logo from './logo.png';

function App() {
  
  const [cityName, setCityName] = useState();
  
  return (
    <div className='app'>
      <img src={logo} alt='logo'></img>
      <h1>Desafio Pokémon</h1>
      <input placeholder='Preencha o campo com uma cidade...' type='text' onChange={e => setCityName(e.target.value)}></input>
      <ResultSearch cityName={cityName}></ResultSearch>
    </div>
    );
  }
  
  export default App;
  