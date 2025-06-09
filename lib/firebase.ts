// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnNtEey4j87mgx5gjqusiANq71txVXe34",
  authDomain: "portfolio-f6d9d.firebaseapp.com",
  projectId: "portfolio-f6d9d",
  storageBucket: "portfolio-f6d9d.firebasestorage.app",
  messagingSenderId: "614909021054",
  appId: "1:614909021054:web:559f6d434e99321a20c12f",
  measurementId: "G-NKRP4JWMB5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
