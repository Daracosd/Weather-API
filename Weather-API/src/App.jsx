import {useState} from 'react';
import {fetchWeather} from './weatherApp.js';
import './App.css';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, Search, ArrowRight, MapPin, Droplets, Wind } from "lucide-react";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setWeatherData(null);
    
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


return(
  <main className="app">
    <h1>Weather App</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Get Weather</button>
    </form>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {weatherData && (
      <div className="weather-card">
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>

        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
        <p className="temp">{weatherData.main.temp} °F</p>
        <p className="description">{weatherData.weather[0].description}</p>
        <p className="details">Humidity: {weatherData.main.humidity}%</p>
        <p className="details">Wind Speed: {weatherData.wind.speed} mph</p>
      </div>
    )}
  </main>
)
}