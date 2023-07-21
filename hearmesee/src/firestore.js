import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAeAl3FUH0PGDWToUzSqhKfj4af-RR-8ok",
  authDomain: "hear-me-see.firebaseapp.com",
  databaseURL: "https://hear-me-see-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hear-me-see",
  storageBucket: "hear-me-see.appspot.com",
  messagingSenderId: "28925318865",
  appId: "1:28925318865:web:77ec8aa82bf8c877a1d7f0",
  measurementId: "G-WN6MKN9KBQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storeLocationData = async (locationData) => {
    try {
      // Add a new document to the "locations" collection in Firestore
      await addDoc(collection(db, "locations"), {
        locationData: locationData,
        timestamp: new Date(), //Track date the location is added
      });

      console.log("Location data stored in Firestore successfully!");
    } catch (error) {
      console.error("Error storing location data in Firestore:", error);
    }
  };
  

  