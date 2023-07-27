// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGfpN0hMxOoTZoono1jA244akNzH_i_7s",
  authDomain: "suggestme-io.firebaseapp.com",
  projectId: "suggestme-io",
  storageBucket: "suggestme-io.appspot.com",
  messagingSenderId: "968159607697",
  appId: "1:968159607697:web:6fa61b2d77d0e682f63830",
  measurementId: "G-1SCP0XZJXN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
