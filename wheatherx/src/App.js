import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


const SearchBar = ({onSearch}) => {
  const [city, setCity] = useState("");
  const handleSearch = () => {
    onSearch(city);
  };

  return (<div className='search-bar'>
    <input type='text' value={city} onChange={e => setCity(e.target.value)} placeholder='Enter city name...' />
    <button onClick={handleSearch}>Search</button>
  </div>)
}

const WeatherDisplay = ({city}) => {
  const [weatherData, setWeatherdata] = useState(null);
  const [Loading, setLoading] = useState(false); 
  
 const API_KEY =  "31fd82cc603c4f8db0882252242402";

 useEffect(()=>{
  const fetchData = async()=>{
    if(!city) return;

    setLoading(true);

    try{
      const response  =  await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
       if(!response.ok){
        throw new Error('failed to fetch');
      
      }
      const data = await response.json();
      setWeatherdata(data);
      setLoading(false); 

    }catch(e){
      setLoading(false);
      console.error(e);
      alert("Failed to fetch weather data");
    }
  }

  fetchData();
 },[city])
  
  return (
    <div className='weather-display'>
      {Loading && <p>Loading data...</p>}
      {!Loading && weatherData && <div className='weather-cards'>
      <div className='weather-card'>
          <span>Temperature</span>
          <p>{weatherData.current.temp_c}°C</p>
        </div>
        <div className='weather-card'>
          <span>Humidity</span>
          <p>{weatherData.current.humidity}%</p>
        </div>
        <div className='weather-card'>
          <span>Condition</span>
          <p>{weatherData.current.condition.text}</p>
        </div>
        <div className='weather-card'>
          <span>wind</span>
          <p>{weatherData.current.wind_kph} kph</p>
        </div>
        </div> }
    </div>
  );
}

const App = ()=>{
  const [city, setCity] = useState("");
  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return <div className='App'>
    <SearchBar onSearch={handleSearch} />
    <WeatherDisplay city={city} />
  </div>
}



export default App;
