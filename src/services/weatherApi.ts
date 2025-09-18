import type { WeatherApiResponse } from "../types/weatherType";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL as string;

export async function fetchWeatherData (city: string) {
  try {
    const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status} ${response.statusText}`);
    }

    const data: WeatherApiResponse = await response.json();

    return data;
  } catch (err) {
    console.error("Error fetching weather data: ", err);
    throw new Error(err instanceof Error ? err.message : "Failed to fetch weather data");
  }
}