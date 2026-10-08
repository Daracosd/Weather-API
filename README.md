# Weather-API

A responsive weather app that shows current conditions for any city. Search a city and get the temperature, a description of the weather, humidity, and wind speed, along with a photo and icon that change to match the conditions.

**Live demo:** [weather-api-darbis.vercel.app](https://weather-api-darbis.vercel.app)


## Features

- Search any city and see current weather from the OpenWeatherMap API
- Temperature (°F), conditions, humidity, and wind speed
- Photo and icon that change with the weather (clear, clouds, rain, drizzle, thunderstorm), with a fallback for other conditions
- Loading state while a request is in flight
- Clear error messages for empty input, unknown cities, and failed requests
- Responsive layout that stacks on phone screens
- UI built from a Figma design

## Tech Stack

- **React** with hooks (`useState`)
- **Vite** for the dev server and build
- **OpenWeatherMap API** (Current Weather endpoint)
- **lucide-react** for icons
- **CSS** with custom properties, Grid, and Flexbox
- **Vercel** for deployment

## Getting Started

1. Clone the repo and move into the app folder:
```bash
   git clone https://github.com/Daracosd/Weather-API.git
   cd Weather-API/Weather-API
```
2. Install dependencies:
```bash
   npm install
```
3. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api). New keys can take a while to activate.
4. Create a file named `.env.local` in the app folder (next to `package.json`):
```
   VITE_WEATHER_API_KEY=your_key_here
```
5. Start the dev server:
```bash
   npm run dev
```

## How It Works

- `src/weatherApi.js` handles the request. It builds the URL, checks `response.ok` (since `fetch` doesn't reject on 404 or 401), and throws readable errors for a missing city, an invalid key, or other failures.
- `src/App.jsx` manages state for the input, weather data, loading, and errors. `handleSubmit` uses `try/catch/finally` so the loading state always resets.
- Lookup objects map the API's weather category (`weather[0].main`) to a photo and an icon, so adding a new condition is a one-line change.

## Deployment

The app is deployed on Vercel. The API key is set as an environment variable (`VITE_WEATHER_API_KEY`) in the Vercel project settings, not committed to the repo.

## Notes

- This is a frontend-only app, so the API key is included in the browser bundle. That's acceptable for a free-tier demo key, but a production app should route requests through a backend that keeps the key secret.
- Temperatures are in Fahrenheit and wind speed is in mph.

## Possible Improvements

- °F/°C toggle
- "Use my location" with the browser Geolocation API
- Multi-day forecast
- More condition photos (snow, fog)
- Backend proxy to hide the API key
