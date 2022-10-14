// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9TwxRLVxgdEei1iRRMPA-DxWzk_G8g8k",
    authDomain: "peace-station.firebaseapp.com",
    databaseURL: "https://peace-station-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "peace-station",
    storageBucket: "peace-station.appspot.com",
    messagingSenderId: "304496872589",
    appId: "1:304496872589:web:3dcffe0b158b1db78d26c4",
    measurementId: "G-WY47B1NDTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);