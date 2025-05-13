// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeyS8Ea6iTBm0gUeNR-cA0K1rarx-3GeI",
  authDomain: "interview-3a5ab.firebaseapp.com",
  projectId: "interview-3a5ab",
  storageBucket: "interview-3a5ab.firebasestorage.app",
  messagingSenderId: "846673167683",
  appId: "1:846673167683:web:ef48cc48d361e82d0a5bf6",
  measurementId: "G-KLV8FEGWQB"
};

// Initialize Firebase
const app = !getApps().length?initializeApp(firebaseConfig):getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);