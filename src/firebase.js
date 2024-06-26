// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqjXQwmjwGTy21ZcgzUpz-GEtXULyMxN0",
  authDomain: "to-do-52968.firebaseapp.com",
  projectId: "to-do-52968",
  storageBucket: "to-do-52968.appspot.com",
  messagingSenderId: "628934670270",
  appId: "1:628934670270:web:d35bcb3cf343638593ebef",
  measurementId: "G-46GBLZ7TV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth };