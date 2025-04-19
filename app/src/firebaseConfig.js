// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use later (e.g., getFirestore)
import { getAnalytics } from "firebase/analytics"; // Optional

// Your web app's Firebase configuration
// Read values from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (Optional: only if measurementId is set AND you enabled Analytics)
// Check if measurementId exists before initializing
const analytics = firebaseConfig.measurementId ? getAnalytics(app) : null;

// Export the initialized app (and other services)
export { app, analytics }; // Export 'analytics' only if needed