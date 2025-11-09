import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.js"; // Import the db instance we configured

// Function to fetch patio listings, initially filtered for Vancouver
export const fetchPatios = async (targetCity = "Vancouver") => {
  try {
    // Reference to the 'patios' collection
    const patiosCollectionRef = collection(db, "patios");

    // Create a query against the collection, filtering by city
    const q = query(patiosCollectionRef, where("City", "==", targetCity)); // Assuming 'City' field exists

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map the results to an array of patio objects including their IDs
    const patiosList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("Fetched Patios:", patiosList); // Log for debugging
    return patiosList;

  } catch (error) {
    console.error("Error fetching patios: ", error);
    // In a real app, you might want to handle this error more gracefully
    return []; // Return empty array on error
  }
};

// You can add functions for adding/updating/deleting patios here later