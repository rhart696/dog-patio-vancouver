import { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import PatioList from './components/PatioList';
import patiosData from './data-patios.json';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [neighbourhoodFilter, setNeighbourhoodFilter] = useState('');

  // Get unique neighbourhoods for filter
  const neighbourhoods = useMemo(() => {
    const uniqueNeighbourhoods = [...new Set(patiosData.map(p => p.Neighbourhood))];
    return uniqueNeighbourhoods.sort();
  }, []);

  // Filter patios based on search and neighbourhood
  const filteredPatios = useMemo(() => {
    return patiosData.filter(patio => {
      const matchesSearch = searchTerm === '' ||
        patio.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patio.FoodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patio.Address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesNeighbourhood = neighbourhoodFilter === '' ||
        patio.Neighbourhood === neighbourhoodFilter;

      return matchesSearch && matchesNeighbourhood;
    });
  }, [searchTerm, neighbourhoodFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-2">
                🐕 Dog Patio Vancouver
              </h1>
              <p className="text-blue-100 mt-2">
                Find the perfect dog-friendly patio in Vancouver
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{patiosData.length}</p>
              <p className="text-blue-100">Verified Patios</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          neighbourhoodFilter={neighbourhoodFilter}
          setNeighbourhoodFilter={setNeighbourhoodFilter}
          neighbourhoods={neighbourhoods}
        />

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          {filteredPatios.length === patiosData.length ? (
            <p>Showing all {filteredPatios.length} dog-friendly patios</p>
          ) : (
            <p>Found {filteredPatios.length} patios matching your criteria</p>
          )}
        </div>

        {/* Patio List */}
        <PatioList patios={filteredPatios} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">🐾 Made with love for Vancouver dog owners</p>
          <p className="text-gray-400 text-sm">
            Data current as of April 2025 |
            <span className="ml-1">Please verify hours and policies before visiting</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
