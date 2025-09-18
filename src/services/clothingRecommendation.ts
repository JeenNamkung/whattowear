import type { ClothingRecommendation } from "../types/recommendationType";
import type { WeatherApiResponse } from "../types/weatherType";

export function getClothingRecommendation (
  weatherData: WeatherApiResponse
): ClothingRecommendation {
  const feelslike: number = weatherData.current.feelslike_c;
  const isRaining: boolean = weatherData.current.precip_mm > 0;
  const wind: number = weatherData.current.wind_kph;

  let recommendation: ClothingRecommendation = {
    text: "",
    subText: undefined,
    top: "",
    bottom: "",
    footwear: "",
    outerwear: undefined,
    accessories: undefined,
  };

  if (feelslike < -10) {
    recommendation = {
      text: "Bundle up with thermal layers, a heavy jacket, and winter accessories to protect against the cold.",
      top: "Sweater",
      bottom: "Thermalpants",
      footwear: "Winterboots",
      outerwear: "Winterjacket",
      accessories: ["Gloves", "Scarf", "Winterhat"],
    };
  } else if (feelslike < 0) {
    recommendation = {
      text: "Wear thick jacket, warm pants, and winter accessories to stay insulated in freezing weather.",
      top: "Sweater",
      bottom: "Jeans",
      footwear: "Winterboots",
      outerwear: "Winterjacket",
      accessories: ["Gloves", "Scarf"],
    };
  } else if (feelslike < 10) {
    recommendation = {
      text: "A hoodie or sweater with a jacket and jeans will keep you comfortable in cool weather.",
      top: "Hoodie",
      bottom: "Jeans",
      footwear: "Shoes",
      outerwear: "Jacket",
    };
  } else if (feelslike < 20) {
    recommendation = {
      text: "Light outerwear or long sleeves are enough for these mild, slightly cool temperatures.",
      top: "Shirt",
      bottom: "Jeans",
      footwear: "Shoes",
      outerwear: "Cardigan",
    };
  } else if (feelslike < 26) {
    recommendation = {
      text: "A T-shirt and breathable pants are ideal for comfortably warm weather.",
      top: "Tshirt",
      bottom: "Trainingpants",
      footwear: "Shoes",
    };
  } else {
    recommendation = {
      text: "Stay cool with a tank top, short pants, and breathable footwear in hot weather.",
      top: "Tanktop",
      bottom: "Pants",
      footwear: "Crocs",
    };
  }

  if (isRaining) {
    recommendation.subText = "It's raining outside, so you should take an umbrella or raincoat with you."
    recommendation.accessories = [
      ...(recommendation.accessories || []),
      "Umbrella",
    ];
    
    if (feelslike > 0 && feelslike < 20) {
      recommendation.outerwear = "Raincoat";
    }
  }

  if (wind > 25) {
    recommendation.subText = "It's windy outside, so you should take a windbreaker with you."
    if (feelslike > 0 && feelslike < 20) {
      recommendation.outerwear = "Windbreaker";
    }
  }

  return recommendation;
}