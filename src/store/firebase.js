import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi3TpZmc4niNeWdYVVcZ-tOl860WXJsAI",
  authDomain: "waterpanel01.firebaseapp.com",
  projectId: "waterpanel01",
  storageBucket: "waterpanel01.firebasestorage.app",
  messagingSenderId: "450314224729",
  appId: "1:450314224729:web:73819209077c1109551d48",
  measurementId: "G-CMD41BERQC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { collection, addDoc, db };
