import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxnOesqVVWULGS7gpGI57aHK9VE-7E95k",
  authDomain: "devrabic-ecom-app-f1a96.firebaseapp.com",
  projectId: "devrabic-ecom-app-f1a96",
  storageBucket: "devrabic-ecom-app-f1a96.firebasestorage.app",
  messagingSenderId: "506526820631",
  appId: "1:506526820631:web:591d45103d63dd7070ef52"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
//export const provider =new GoogleAuthProvider()
export const database= getFirestore(app)