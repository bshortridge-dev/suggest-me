// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY as string,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FB_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FB_APP_ID as string,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
