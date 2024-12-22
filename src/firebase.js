// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "down-under-brews.firebaseapp.com",
    projectId: "down-under-brews",
    storageBucket: "down-under-brews.firebasestorage.app",
    messagingSenderId: "751341862320",
    appId: "1:751341862320:web:7ea07e78c64d1755edea75",
    measurementId: "G-NEFV78ZVJG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
