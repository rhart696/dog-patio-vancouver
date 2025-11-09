import PatioCard from './PatioCard';

export default function PatioList({ patios }) {
  if (!patios || patios.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No patios found. Try adjusting your search!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patios.map((patio, index) => (
        <PatioCard key={index} patio={patio} />
      ))}
    </div>
  );
}