const BASE_URL="https://api.openweathermap.org/data/2.5/weather";
const API_KEY= import.meta.env.VITE_WEATHER_KEY ;

export async function fetchWeather(city, units="imperial") {

    const url = `${BASE_URL}?q=${city}&units=${units}&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`City "${city}" not found.`);
        }
        if (response.status === 401) {
            throw new Error("Invalid API key.");
        }
        throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    return await response.json();
    
}