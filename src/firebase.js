// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqZgWCSXMakOA4rymAqxj8C9fZTEBILfw",
    authDomain: "mindlog-v2.firebaseapp.com",
    projectId: "mindlog-v2",
    storageBucket: "mindlog-v2.appspot.com",
    messagingSenderId: "219224337475",
    appId: "1:219224337475:web:919b14a3f1cbaadea2f8f6",
    measurementId: "G-8C6QFNKWTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);