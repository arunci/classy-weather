import React, { useState } from "react";
import useFetchWeather from "./useFectchWeather";
import Weather from "./Weather";
import Input from "./Input";

export default function App() {
  const savedLocation = localStorage.getItem("lastLocation");
  const [location, setLocation] = useState(savedLocation || "");
  const { weather, displayLocation, isLoading } = useFetchWeather(location);

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input location={location} onChangeLocation={setLocation} />
      {isLoading && <p className="loader">Loading...</p>}
      {weather.weathercode && (
        <Weather weather={weather} location={displayLocation} />
      )}
    </div>
  );
}
