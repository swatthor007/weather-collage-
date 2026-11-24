import { useState, useEffect } from "react";
import WeatherContext from "./WeatherContext";
import { getWeatherByCity } from "../Services/weather";

function WeatherProvider({ children }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchWeather(cityName) {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getWeatherByCity(cityName);
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Runs once when the app opens
  useEffect(() => {
    searchWeather("Chennai");
  }, []);

  const value = {
    city,
    setCity,
    weather,
    loading,
    error,
    searchWeather,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export default WeatherProvider;
