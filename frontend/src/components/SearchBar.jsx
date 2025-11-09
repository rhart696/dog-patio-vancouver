export default function SearchBar({ searchTerm, setSearchTerm, neighbourhoodFilter, setNeighbourhoodFilter, neighbourhoods }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Search patios by name or food type..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-64">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={neighbourhoodFilter}
            onChange={(e) => setNeighbourhoodFilter(e.target.value)}
          >
            <option value="">📍 All Neighbourhoods</option>
            {neighbourhoods.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}