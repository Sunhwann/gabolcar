"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig";
import TravelTypeSelection from "../components/TravelTypeSelection";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
let isLoggingIn = false; // 중복 로그인 방지 변수

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 선택한 여행 유형

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return; // 중복 로그인 방지
    isLoggingIn = true;

    try {
      if (window.innerWidth < 768) {
        // 모바일 환경 → 리디렉트 로그인
        await signInWithRedirect(auth, provider);
      } else {
        // 데스크탑 환경 → 팝업 로그인
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      isLoggingIn = false;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* 🔥 환영 메시지 페이드아웃 효과 */}
      {showWelcome ? (
        <h1 className="text-3xl font-bold text-gray-800 mb-6 opacity-100 animate-fadeOut">
          ✨ 하노이 여행을 환영합니다 ✨
        </h1>
      ) : (
        <>
         {/* 여행 유형 버튼 */}
{selectedType === null ? (
  <div className="grid grid-cols-2 gap-4">
    {[
      { type: "자유여행", emoji: "🌍", color: "bg-green-500" },
      { type: "골프여행", emoji: "⛳", color: "bg-yellow-500" },
      { type: "공항픽업샌딩", emoji: "✈️", color: "bg-blue-500" },
      { type: "비즈니스 트립", emoji: "💼", color: "bg-gray-700" }
    ].map(({ type, emoji, color }) => (
      <button
        key={type}
        onClick={() => setSelectedType(type)}
        className={`p-4 ${color} text-white rounded-lg text-lg w-40 flex flex-col items-center`}
      >
        <span className="text-2xl">{emoji}</span>
        {type}
      </button>
    ))}
  </div>
) : (
  <>
    {/* 선택한 여행 유형의 세부 입력 폼 */}
    <h2 className="text-2xl font-bold mt-6">{selectedType} 예약</h2>
    <TravelTypeSelection type={selectedType} onSelect={() => {}} />


  </>
)}

          {/* 로그인 / 로그아웃 버튼 */}
          {user ? (
            <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">
              로그아웃
            </button>
          ) : (
            <button onClick={handleLogin} className="mt-4 p-2 bg-blue-500 text-white rounded">
              로그인 / 회원가입
            </button>
          )}
        </>
      )}
    </div>
  );
}
