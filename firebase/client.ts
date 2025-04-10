import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChMeQ9rgKvyoZmUQhXYgUE_aYyY2PyWik",
  authDomain: "prepwise-a174a.firebaseapp.com",
  projectId: "prepwise-a174a",
  storageBucket: "prepwise-a174a.firebasestorage.app",
  messagingSenderId: "204349736586",
  appId: "1:204349736586:web:2f2611d15969957f388f73",
  measurementId: "G-GMR5X09XEB",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
