import { useWeatherData } from "../hooks/useWeatherData";
import { useClothingRecommendation } from "../hooks/useClothingRecommendation";
import { SearchForm } from "../components/SearchForm";
import { WeatherCard } from "../components/WeatherCard";
import { ClothingGrid } from "../components/ClothingGrid";

export default function HomePage() {
  const { weatherData, isLoading, error, fetchCityWeather, setError } = useWeatherData();
  const clothing = useClothingRecommendation(weatherData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
        <div className="relative px-6 py-20 text-center text-white">
          <h1 className="font-bold text-5xl lg:text-6xl mb-4 tracking-tight animate-fade-in-up">
            What to Wear
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Get personalized clothing recommendations based on real-time weather
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Search and Weather Card */}
          <div className="space-y-6">
            <SearchForm
              onSearch={fetchCityWeather}
              isLoading={isLoading}
              error={error}
              onErrorClear={() => setError("")}
            />
            <WeatherCard weatherData={weatherData} />
          </div>

          {/* Clothing Recommendations */}
          <ClothingGrid clothing={clothing} />
        </div>
      </div>
    </div>
  )
}