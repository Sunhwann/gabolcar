"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig";
import TravelTypeSelection from "../components/TravelTypeSelection";
import LoginButton from "../components/LoginButton";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const handleTravelTypeSelect = (type) => {
    router.push(`/schedule?type=${encodeURIComponent(type)}`);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // 3초 후 "하노이 여행을 환영합니다" 문구가 사라짐
    setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* 🔥 환영 메시지 페이드아웃 효과 */}
      {showWelcome ? (
        <h1 className="text-3xl font-bold text-gray-800 mb-6 opacity-100 animate-fadeOut">✨ 하노이 여행을 환영합니다 ✨</h1>
      ) : (
        <>
      <TravelTypeSelection onSelect={handleTravelTypeSelect} />
          {!user && <LoginButton />}
        </>
      )}
    </div>
  );
}
