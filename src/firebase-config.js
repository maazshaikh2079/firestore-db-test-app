import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCusEI8bpuhCdLI-aDhbZd9Tbdd2G3PG94",
  authDomain: "fb-w-rjs.firebaseapp.com",
  projectId: "fb-w-rjs",
  storageBucket: "fb-w-rjs.appspot.com",
  messagingSenderId: "746609509777",
  appId: "1:746609509777:web:d3d4c4aad00dfb99088630",
  measurementId: "G-QF1XEDNYSQ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);