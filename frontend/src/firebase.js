// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { store } from "./store/store";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-estate-95c22.firebaseapp.com",
  projectId: "mern-estate-95c22",
  storageBucket: "mern-estate-95c22.appspot.com",
  messagingSenderId: "28858580327",
  appId: "1:28858580327:web:075558e6be5c6515ce43c2",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
