import { useState, useEffect } from "react";
import { fetchWeatherData } from "../services/weatherApi";
import type { WeatherApiResponse } from "../types/weatherType";

export function useWeatherData() {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData("Vancouver");
      setWeatherData(data);
    };
    fetchData();
  }, []);

  const fetchCityWeather = async (city: string) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      console.error("Failed to fetch weather data: ", err);
      setError("City not found. Please check the city name and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    weatherData,
    isLoading,
    error,
    fetchCityWeather,
    setError
  };
}