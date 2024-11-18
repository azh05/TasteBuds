
import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB19QL37wHwxQgr-HucZLl-6d1_giGBhcA",
  authDomain: "tastebuds-70acc.firebaseapp.com",
  projectId: "tastebuds-70acc",
  storageBucket: "tastebuds-70acc.firebasestorage.app",
  messagingSenderId: "608301945207",
  appId: "1:608301945207:web:335fe11905c950a412d172",
  measurementId: "G-TQH1XXB0MM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };