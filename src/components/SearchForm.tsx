import { useState } from "react";

interface SearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  error: string;
  onErrorClear: () => void;
}

export function SearchForm({ onSearch, isLoading, error, onErrorClear }: SearchFormProps) {
  const [cityInput, setCityInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
    if (error) onErrorClear();
  };

  const handleSubmit = () => {
    onSearch(cityInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 card-hover animate-fade-in-up">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Search Location
      </h2>
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            placeholder="Enter city name..."
            value={cityInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-md transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}