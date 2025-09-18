import { images } from "../constants/images";
import type { ClothingRecommendation } from "../types/recommendationType";

interface ClothingGridProps {
  clothing?: ClothingRecommendation;
}

interface ClothingItemProps {
  item?: string;
  label: string;
  isLoading: boolean;
}

function ClothingItem({ item, label, isLoading }: ClothingItemProps) {
  if (isLoading) {
    return (
      <div className="text-center">
        <div className="bg-gray-100 rounded-lg p-4 mb-2 h-28 shimmer"></div>
        <p className="text-sm font-medium text-gray-400">{label}</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center opacity-60">
        <div className="bg-green-50 border-2 border-dashed border-green-200 rounded-lg p-4 mb-2 h-28 flex items-center justify-center">
          <div className="text-center">
            <div className="text-green-500 text-2xl mb-1">✓</div>
            <p className="text-xs text-green-600 font-medium">Not needed</p>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400">{label}</p>
      </div>
    );
  }

  return (
    <div className="text-center animate-fade-in-up">
      <div className="bg-gray-50 rounded-lg p-4 mb-2 hover:bg-gray-100 hover:scale-105 transition-all duration-200 cursor-pointer">
        <img
          src={images[item as keyof typeof images]}
          alt={item}
          className="w-full h-20 object-contain"
        />
      </div>
      <p className="text-sm font-medium text-gray-600 capitalize">{label}</p>
    </div>
  );
}

export function ClothingGrid({ clothing }: ClothingGridProps) {
  const isLoading = clothing === undefined;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 card-hover animate-fade-in-up">
      <h2 className="text-2xl font-semibold gradient-text mb-6">
        Recommended Outfit
      </h2>

      {clothing?.text ? (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 animate-fade-in-up">
          <p className="text-gray-700 font-medium">
            {clothing.text}
          </p>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg animate-fade-in-up">
          <div className="h-6 bg-gray-200 rounded shimmer"></div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ClothingItem
          item={clothing?.top}
          label="Top"
          isLoading={isLoading}
        />
        <ClothingItem
          item={clothing?.bottom}
          label="Bottom"
          isLoading={isLoading}
        />
        <ClothingItem
          item={clothing?.footwear}
          label="Footwear"
          isLoading={isLoading}
        />
        <ClothingItem
          item={clothing?.outerwear}
          label="Outerwear"
          isLoading={isLoading}
        />
      </div>

      {clothing?.accessories && clothing.accessories.length > 0 && (
        <div className="mt-8 animate-fade-in-up">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>✨</span>
            Accessories
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {clothing.accessories.map((item, index) => (
              <div
                key={item}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 mb-2 hover:from-purple-100 hover:to-blue-100 hover:scale-105 transition-all duration-200 cursor-pointer border border-purple-100">
                  <img
                    src={images[item as keyof typeof images]}
                    alt={item}
                    className="w-full h-16 object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-600 capitalize">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}