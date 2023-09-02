// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDclAlquW573CSxX8dJv8OYbIBAgfsYruM",
  authDomain: "react-studen-crud.firebaseapp.com",
  projectId: "react-studen-crud",
  storageBucket: "react-studen-crud.appspot.com",
  messagingSenderId: "115860572652",
  appId: "1:115860572652:web:254ad5b80c6b4976c958c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

const db = getFirestore();

export { db };