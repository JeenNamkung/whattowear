import { useState, useEffect } from "react";
import { getClothingRecommendation } from "../services/clothingRecommendation";
import type { WeatherApiResponse } from "../types/weatherType";
import type { ClothingRecommendation } from "../types/recommendationType";

export function useClothingRecommendation(weatherData?: WeatherApiResponse) {
  const [clothing, setClothing] = useState<ClothingRecommendation>();

  useEffect(() => {
    if (weatherData) {
      setClothing(getClothingRecommendation(weatherData));
    }
  }, [weatherData]);

  return clothing;
}