import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDffkzkNBlubK63Kdd2imQKRUHrcHWAvYg",
  authDomain: "test-project-tomymiron.firebaseapp.com",
  projectId: "test-project-tomymiron",
  storageBucket: "test-project-tomymiron.appspot.com",
  messagingSenderId: "166223294211",
  appId: "1:166223294211:web:8aa2361593769ac8414336"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);