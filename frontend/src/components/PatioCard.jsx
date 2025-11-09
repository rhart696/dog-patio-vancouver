export default function PatioCard({ patio }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900">
          🐕 {patio.Name}
        </h3>
        {patio.UserRating && (
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            ⭐ {patio.UserRating}
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-2">{patio.Address}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          📍 {patio.Neighbourhood}
        </span>
        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
          🍴 {patio.FoodType}
        </span>
        {patio.SpaceRating && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            📏 {patio.SpaceRating}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {patio.WaterBowl && (
          <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded">
            💧 Water Bowl
          </span>
        )}
        {patio.CoveredPatio && (
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
            ☂️ Covered
          </span>
        )}
        {patio.HeatedPatio && (
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
            🔥 Heated
          </span>
        )}
        {patio.DogPolicyVerified && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            ✅ Verified
          </span>
        )}
      </div>

      {patio.UserComments && (
        <p className="text-sm text-gray-700 italic mb-3">
          "{patio.UserComments}"
        </p>
      )}

      {patio.PetAmenities && patio.PetAmenities.length > 0 && (
        <div className="text-xs text-gray-600">
          <strong>Amenities:</strong> {patio.PetAmenities.join(', ')}
        </div>
      )}

      {patio.Contact && patio.Contact.Hours && (
        <div className="text-xs text-gray-500 mt-2">
          🕐 {patio.Contact.Hours}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        {patio.Geo && patio.Geo.GoogleMapsURL && (
          <a
            href={patio.Geo.GoogleMapsURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
          >
            📍 Map
          </a>
        )}
        {patio.Contact && patio.Contact.WebsiteURL && (
          <a
            href={patio.Contact.WebsiteURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
          >
            🌐 Website
          </a>
        )}
      </div>
    </div>
  );
}