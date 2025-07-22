import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_9QwNcnkCQRMB2oImRpnf5DxRo4k_hCY",
  authDomain: "projetofinal-4c3da.firebaseapp.com",
  projectId: "projetofinal-4c3da",
  storageBucket: "projetofinal-4c3da.firebasestorage.app",
  messagingSenderId: "66833066385",
  appId: "1:66833066385:web:697a826253cc395303d230"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};