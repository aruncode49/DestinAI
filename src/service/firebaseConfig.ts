// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYeLYZzDbcVJDNn-giACPouaz-icNS5Os",
    authDomain: "react-projects-da08b.firebaseapp.com",
    projectId: "react-projects-da08b",
    storageBucket: "react-projects-da08b.appspot.com",
    messagingSenderId: "522813886437",
    appId: "1:522813886437:web:e28b17c49c31177f39a90c",
    measurementId: "G-79R95JEBEP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
