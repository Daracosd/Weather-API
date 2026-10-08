import {useState} from 'react';
import {fetchWeather} from './weatherApp.js';
import './App.css';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, Search, ArrowRight, MapPin, Droplets, Wind } from "lucide-react";


const CONDITION_IMAGES = {
  "Clear": "/public/sun.jpg",
  "Clouds": "/public/cloudy.jpg",
  "Rain": "/public/rain.jpg",
  "Drizzle":"/public/rain.jpg",
  "Thunderstorm":"/public/rain.jpg",
}

const DEFAULT_IMAGE = "/public/cloudy.jpg";

const CONDITION_ICONS = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Drizzle: CloudRain,
  Thunderstorm: CloudLightning,
  Snow: Snowflake,
};

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);
    
    try {
      const data = await fetchWeather(trimmedCity);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const main=weatherData?.weather[0]?.main;
  const photo=CONDITION_IMAGES[main] || DEFAULT_IMAGE;
  const ConditionIcon=CONDITION_ICONS[main] || Sun;

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon"><CloudRain size={18} /></span>
          <span className="brand-name">Weather App</span>
        </div>
        <span className="topbar-note">Current Weather</span>

      </header>

      <form className="search" onSubmit={handleSubmit}>
        <label htmlfor="city">Search for a city</label>
        <div className="search-row">
          <div className="input-wrap">
            <Search size={16} />
            <input
              id="city"
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : <ArrowRight size={16} />}
          </button>
        </div>
      </form>
      
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      {weatherData && (
        <section className="card">
          <div clasName="card-main">
            <p className="eyebrow"><MapPin size={12} /> Current weather</p>
            <h2 className="place">
              {weatherData.name}, {weatherData.sys.country}
            </h2>

            <div className="temp">
              {Math.round(weatherData.main.temp)}
              <span className="unit">°F</span>
            </div>

            <p className="condition">
              <ConditionIcon  size={18} /> {weatherData.weather[0].description}
            </p>

            <div className="stats">
              <div className="stat"> 
                <span className="stat-label"><Droplets size={14} /> Humidity</span>
                <span className="stat-value">{weatherData.main.humidity}%</span>
              </div>
              <div className="stat">
                <span className="stat-label"><Wind size={14} /> Wind</span>
                <span className="stat-value">{Math.round(weatherData.wind.speed)} mph</span>
              </div>
            </div>
          </div>
          <div className="card-photo" style={{ backgroundImage: `url(${photo})` }}/>
        
      </section>
      )}
    </div>
  );  
}