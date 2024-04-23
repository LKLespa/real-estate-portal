// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSbxR0n9CkdbKXF1FLqTB7It0GULEC6DQ",
  authDomain: "realstate-portal.firebaseapp.com",
  projectId: "realstate-portal",
  storageBucket: "realstate-portal.appspot.com",
  messagingSenderId: "441477484418",
  appId: "1:441477484418:web:45c8411a3a283df5a8099b",
  measurementId: "G-3KSNY80HJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }