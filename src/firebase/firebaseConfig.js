import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZTdCvBfb-KUJ7dEUk_RrGK40uGd1JvSE",
  authDomain: "my-store-62660.firebaseapp.com",
  projectId: "my-store-62660",
  storageBucket: "my-store-62660.appspot.com",
  messagingSenderId: "346476495001",
  appId: "1:346476495001:web:bc5c8bf3f43e8c8f307808",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

//data base
export const bd = getFirestore(app);
