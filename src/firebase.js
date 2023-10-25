// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACC1O-oH0NRlxZrCi3IeHkf8dkknaN_6k",
  authDomain: "react-auth-9d738.firebaseapp.com",
  projectId: "react-auth-9d738",
  storageBucket: "react-auth-9d738.appspot.com",
  messagingSenderId: "60010205358",
  appId: "1:60010205358:web:0690c763613ff94b7f9d3f",
  measurementId: "G-3EGNC917S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};