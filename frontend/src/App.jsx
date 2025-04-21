import { useState, useEffect } from 'react';
import { fetchPatios } from './services/patios'; // Import the function we created
import './App.css'; // Keep existing styles if needed

function App() {
  // State to hold the list of patios
  const [patios, setPatios] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to track potential errors
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define an async function inside useEffect to call fetchPatios
    const loadPatios = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors
        const patiosData = await fetchPatios(); // Call the fetch function
        setPatios(patiosData); // Update state with fetched data
      } catch (err) {
        console.error("Error in useEffect:", err);
        setError("Failed to load patio data."); // Set error state
        setPatios([]); // Clear patios on error
      } finally {
        setLoading(false); // Stop loading regardless of success/error
      }
    };

    loadPatios(); // Call the async function
  }, []); // Empty dependency array means this effect runs only once on mount

  // --- Render Logic ---
  return (
    <>
      <h1>Vancouver Dog-Friendly Patios</h1>

      {/* Display loading message */}
      {loading && <p>Loading patios...</p>}

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display patio list or 'not found' message */}
      {!loading && !error && (
        <div>
          {patios.length > 0 ? (
            <ul>
              {patios.map((patio) => (
                // Use patio.id as the key for React list rendering
                <li key={patio.id}>
                  <strong>{patio.Name}</strong> ({patio.Neighbourhood || 'N/A'})
                  {/* Add more details later */}
                </li>
              ))}
            </ul>
          ) : (
            // Message displayed if no patios are loaded (and not currently loading/error)
            <p>No patios found. The database might be empty, or check Firestore rules/query.</p>
          )}
        </div>
      )}
    </>
  );
}

export default App;