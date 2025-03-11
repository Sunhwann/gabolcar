"use client";

import { auth, provider, db } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";  // ✅ `firebase/auth`에서 가져오기
import { doc, setDoc } from "firebase/firestore";  
import { useState } from "react";  

export default function LoginButton() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);  // ✅ 오류 해결
      const user = result.user;
      setUser(user);

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      console.log("로그인 성공:", user);
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return <button onClick={handleLogin}>로그인</button>;
}
