
import { useEffect, useState } from 'react';
import './App.css';
import ResultSearch from './components/ResultSearch';

function App() {
  

  const [cityName, setCityName] = useState();


  
  return (
    <div>
    <input type='text' onChange={e => setCityName(e.target.value)}></input>
    <br/>
    <ResultSearch cityName={cityName}></ResultSearch>
    </div>
    );
  }
  
  export default App;
  