import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDoDWVOJFjpS_RwKfwzHd8Y_-RgmBdwSk8",
    authDomain: "gabolcar-6021d.firebaseapp.com",
    projectId: "gabolcar-6021d",
    storageBucket: "gabolcar-6021d.firebasestorage.app",
    messagingSenderId: "1004757584178",
    appId: "1:1004757584178:web:18acde73f34684a883ef2b",
    measurementId: "G-0M9MJJ18BQ"
  };
  
// 🔥 Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, db };  // ✅ `doc` 제거