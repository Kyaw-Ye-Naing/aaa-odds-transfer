// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-eqKkbYHk_gTUhzKxR3jZjBn_ea7kHdE",
  authDomain: "sport909-d0076.firebaseapp.com",
  databaseURL: "https://sport909-d0076-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sport909-d0076",
  storageBucket: "sport909-d0076.appspot.com",
  messagingSenderId: "33504700051",
  appId: "1:33504700051:web:6b03cacf810b8172984f66",
  measurementId: "G-8MB9T41P0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;