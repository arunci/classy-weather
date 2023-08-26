import { useState, useEffect } from "react";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function useFetchWeather(location) {
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    async function fetchWeather() {
      if (location.length < 2) return setWeather({});
      try {
        setIsLoading(true);
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || !geoRes.ok)
          throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results[0];
        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        if (weatherRes.ok) {
          setWeather(weatherData.daily);
          localStorage.setItem("lastLocation", location);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
  }, [location]);
  return { weather, isLoading, displayLocation };
}
