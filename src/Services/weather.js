// Uses Open-Meteo (free, no API key needed): https://open-meteo.com

// Turns Open-Meteo's weather code into text and an icon
function getCondition(code) {
  if (code === 0) return { description: "clear sky", icon: "01d" };
  if (code <= 2) return { description: "partly cloudy", icon: "02d" };
  if (code === 3) return { description: "overcast clouds", icon: "04d" };
  if (code === 45 || code === 48) return { description: "fog", icon: "50d" };
  if (code >= 51 && code <= 57) return { description: "drizzle", icon: "09d" };
  if (code >= 61 && code <= 67) return { description: "rain", icon: "10d" };
  if (code >= 71 && code <= 77) return { description: "snow", icon: "13d" };
  if (code >= 80 && code <= 82) return { description: "rain showers", icon: "09d" };
  if (code === 85 || code === 86) return { description: "snow showers", icon: "13d" };
  if (code >= 95) return { description: "thunderstorm", icon: "11d" };
  return { description: "unknown", icon: "03d" };
}

export async function getWeatherByCity(city) {
  // Step 1: find the city's location
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const geoResponse = await fetch(geoUrl);

  if (!geoResponse.ok) {
    throw new Error("Could not search for the city. Try again.");
  }

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found. Please check the spelling.");
  }

  const place = geoData.results[0];

  // Step 2: get the weather for that location
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=ms`;

  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Could not get weather. Try again.");
  }

  const data = await weatherResponse.json();
  const current = data.current;
  const condition = getCondition(current.weather_code);

  // Same shape as before, so the other files need no changes
  return {
    name: place.name,
    main: {
      temp: current.temperature_2m,
      humidity: current.relative_humidity_2m,
    },
    weather: [{ description: condition.description, icon: condition.icon }],
    wind: { speed: current.wind_speed_10m },
  };
}
