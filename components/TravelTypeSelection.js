"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const travelTypes = [
  { type: "자유여행", icon: "🏝️", description: "원하는 일정과 장소를 자유롭게 선택하세요." },
  { type: "골프여행", icon: "⛳", description: "라운딩과 차량 일정을 계획하세요." },
  { type: "공항 픽업/샌딩", icon: "✈️", description: "편리한 공항 이동 서비스를 제공합니다." },
  { type: "비즈니스 트립", icon: "💼", description: "비즈니스 일정에 맞춘 차량 서비스를 제공합니다." },
];

export default function TravelTypeSelection({ onSelect }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-600  mb-4">여행 유형을 선택하세요</h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {travelTypes.map(({ type, icon, description }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100 transition"
          >
            <span className="text-3xl mb-2">{icon}</span>
            <span className="font-semibold text-gray-900">{type}</span>
            <span className="text-sm text-gray-600 mt-1 text-center">{description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
