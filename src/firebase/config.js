// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWBUWqz_gUgffzdj8SZvIBxmDAkgPZzPs",
  authDomain: "resai2.firebaseapp.com",
  projectId: "resai2",
  storageBucket: "resai2.firebasestorage.app",
  messagingSenderId: "550459634414",
  appId: "1:550459634414:web:3e1a24c13a15390151b9ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
