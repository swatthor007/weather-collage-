import { useContext } from "react";
import WeatherContext from "../Context/WeatherContext";
import WeatherCard from "./WeatherCard";

function Weather() {
  const { city, setCity, weather, loading, error, searchWeather } =
    useContext(WeatherContext);

  function handleSubmit(event) {
    event.preventDefault();
    searchWeather(city);
  }

  return (
    <main className="weather">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="message loading">Loading weather...</p>}

      {error && <p className="message error">{error}</p>}

      {weather && !loading && (
        <WeatherCard
          city={weather.name}
          temperature={weather.main.temp}
          condition={weather.weather[0].description}
          icon={weather.weather[0].icon}
          humidity={weather.main.humidity}
          windSpeed={weather.wind.speed}
        />
      )}
    </main>
  );
}

export default Weather;
