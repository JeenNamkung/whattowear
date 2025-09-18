import type { WeatherApiResponse } from "../types/weatherType";

interface WeatherCardProps {
  weatherData?: WeatherApiResponse;
}

export function WeatherCard({ weatherData }: WeatherCardProps) {
  if (!weatherData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 card-hover">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full shimmer"></div>
          <p className="text-gray-500">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 card-hover animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">
            {weatherData.location.name}
          </h3>
          <p className="text-gray-600 capitalize">
            {weatherData.current.condition.text}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
            className="w-16 h-16 animate-pulse-slow"
          />
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-800">
              {weatherData.current.temp_c}°
            </div>
            <div className="text-gray-600">Celsius</div>
          </div>
        </div>
      </div>
    </div>
  );
}