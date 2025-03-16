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

  // Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Authentication & Firestore 초기화
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// 로그인 함수
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google 로그인 실패:", error);
    return null;
  }
};

// 로그아웃 함수
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};



export { auth, provider, db, signInWithPopup, signOut };

// Firestore 및 Auth 내보내기
export const firestore = getFirestore(app);
