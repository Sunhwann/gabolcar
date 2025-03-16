"use client";

import { useState } from "react";
import { addBusinessTrip } from "../firebaseFunctions";

export default function BusinessTripForm({ userId }) {
  const [tripDetails, setTripDetails] = useState({
    title: "",
    schedules: [{ departure: "", destinations: [""], meetingTime: "", duration: "" }]
  });

  // 입력 변경 핸들러 (수정됨)
  const handleChange = (index, key, value) => {
    setTripDetails((prevTripDetails) => {
      const updatedSchedules = [...prevTripDetails.schedules];
      updatedSchedules[index] = { ...updatedSchedules[index], [key]: value };
      return { ...prevTripDetails, schedules: updatedSchedules };
    });
  };

  // 목적지 추가
  const addDestination = (index) => {
    setTripDetails((prevTripDetails) => {
      const updatedSchedules = [...prevTripDetails.schedules];
      updatedSchedules[index].destinations.push("");
      return { ...prevTripDetails, schedules: updatedSchedules };
    });
  };

  // 목적지 삭제
  const removeDestination = (index, destIndex) => {
    setTripDetails((prevTripDetails) => {
      const updatedSchedules = [...prevTripDetails.schedules];
      updatedSchedules[index].destinations.splice(destIndex, 1);
      return { ...prevTripDetails, schedules: updatedSchedules };
    });
  };

  // Firestore에 저장
  const handleSave = async () => {
    if (!userId) {
      console.error("Error: User ID is missing.");
      return;
    }

    try {
      console.log("Saving tripDetails:", tripDetails);
      const tripId = await addBusinessTrip(userId, tripDetails);
      console.log("Trip saved successfully! Trip ID:", tripId);
    } catch (error) {
      console.error("Error saving trip:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">👔 비즈니스 트립</h2>

      {/* 일정 입력 필드 */}
      {tripDetails.schedules.map((schedule, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-100 mb-4">
          <input
            type="text"
            placeholder="출발 장소"
            value={schedule.departure}
            onChange={(e) => handleChange(index, "departure", e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
          />

          {schedule.destinations.map((dest, destIndex) => (
            <div key={destIndex} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="목적지"
                value={dest}
                onChange={(e) => {
                  setTripDetails((prevTripDetails) => {
                    const updatedSchedules = [...prevTripDetails.schedules];
                    updatedSchedules[index].destinations[destIndex] = e.target.value;
                    return { ...prevTripDetails, schedules: updatedSchedules };
                  });
                }}
                className="w-full p-2 border rounded-lg mb-2"
              />
              <button onClick={() => removeDestination(index, destIndex)} className="text-red-500">❌</button>
            </div>
          ))}

          <button onClick={() => addDestination(index)} className="text-blue-500">➕ 목적지 추가</button>

          <input
            type="time"
            value={schedule.meetingTime}
            onChange={(e) => handleChange(index, "meetingTime", e.target.value)}
            className="w-full p-2 border rounded-lg mt-2"
          />

          <input
            type="text"
            placeholder="예상 이용시간 (예: 4시간)"
            value={schedule.duration}
            onChange={(e) => handleChange(index, "duration", e.target.value)}
            className="w-full p-2 border rounded-lg mt-2"
          />
        </div>
      ))}

      <button onClick={handleSave} className="mt-4 p-3 text-lg w-full rounded-lg bg-green-500 text-white">
        📩 예약 저장
      </button>
    </div>
  );
}
