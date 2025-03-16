"use client";

import { useState } from "react";
import ScheduleForm from "./ScheduleForm"; // 자유여행 UI
import GolfScheduleForm from "./GolfScheduleForm"; // 골프여행 UI
import AirportTransferForm from "./AirportTransferForm"; // 공항 픽업/샌딩 UI (추가 예정)
import BusinessTripForm from "./BusinessTripForm"; // 비즈니스 트립 UI (추가 예정)

export default function TravelTypeSelection() {
  const [travelType, setTravelType] = useState("freeTravel"); // 기본값: 자유여행

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🌍 여행 타입 선택</h2>

      {/* 여행 타입 선택 버튼 */}
      <div className="grid grid-cols-2 gap-4 mb-6 w-full">
        <button
          onClick={() => setTravelType("freeTravel")}
          className={`p-3 rounded-lg text-lg flex items-center justify-center ${
            travelType === "freeTravel" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          ✈️ 자유여행
        </button>
        <button
          onClick={() => setTravelType("golfTravel")}
          className={`p-3 rounded-lg text-lg flex items-center justify-center ${
            travelType === "golfTravel" ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          ⛳ 골프여행
        </button>
        <button
          onClick={() => setTravelType("airportTransfer")}
          className={`p-3 rounded-lg text-lg flex items-center justify-center ${
            travelType === "airportTransfer" ? "bg-purple-500 text-white" : "bg-gray-300"
          }`}
        >
          🚖 공항 픽업/샌딩
        </button>
        <button
          onClick={() => setTravelType("businessTrip")}
          className={`p-3 rounded-lg text-lg flex items-center justify-center ${
            travelType === "businessTrip" ? "bg-orange-500 text-white" : "bg-gray-300"
          }`}
        >
          👔 비즈니스 트립
        </button>
      </div>

      {/* 선택된 여행 타입에 따라 다른 UI 표시 */}
      {travelType === "freeTravel" && <ScheduleForm />}
      {travelType === "golfTravel" && <GolfScheduleForm />}
      {travelType === "airportTransfer" && <AirportTransferForm />}
      {travelType === "businessTrip" && <BusinessTripForm />}
    </div>
  );
}
