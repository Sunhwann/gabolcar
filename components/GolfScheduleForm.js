"use client";

import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { saveTempGolfTrip, requestQuotationGolfTrip } from "../firebaseFunctions";

const hanoiGolfCourses = [
  "Sky Lake Resort & Golf Club",
  "BRG Kings Island Golf Resort",
  "Long Bien Golf Course",
  "Van Tri Golf Club",
  "Legend Hill Golf Resort",
  "FLC Ha Long Bay Golf Club",
  "Tam Dao Golf Resort",
  "Dai Lai Star Golf & Country Club"
];

export default function GolfTripForm() {
  const [userId, setUserId] = useState(null);
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      departure: "",
      departureLink: "", // 출발지 구글 지도 링크
      golfCourse: "",
      customGolfCourse: "",
      dateTime: "" // 날짜 및 시간 추가
    }
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
    });

    return () => unsubscribe();
  }, []);

  const openMapLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  const addSchedule = () => {
    setSchedules([
      ...schedules,
      {
        id: schedules.length + 1,
        departure: "",
        departureLink: "",
        golfCourse: "",
        customGolfCourse: "",
        dateTime: ""
      }
    ]);
  };

  const removeSchedule = (id) => {
    if (schedules.length === 1) {
      alert("⚠️ 최소한 하나의 일정은 필요합니다!");
      return;
    }
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  // 💾 임시 저장
  const handleSaveTemp = async () => {
    if (!userId) {
      alert("⚠️ 로그인 후 이용해 주세요!");
      return;
    }

    try {
      await saveTempGolfTrip(userId, schedules);
      alert("✅ 골프 여행 일정이 임시 저장되었습니다!");
    } catch (error) {
      console.error("❌ 임시 저장 실패:", error);
      alert("⚠️ 임시 저장 중 오류가 발생했습니다.");
    }
  };

  // 📩 견적 요청
  const handleRequestQuotation = async () => {
    if (!userId) {
      alert("⚠️ 로그인 후 이용해 주세요!");
      return;
    }

    try {
      const requestId = await requestQuotationGolfTrip(userId, schedules);
      alert(`✅ 견적 요청 완료! 요청 ID: ${requestId}`);
    } catch (error) {
      console.error("❌ 견적 요청 실패:", error);
      alert("⚠️ 견적 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">⛳ 골프 여행 일정</h2>

      {schedules.map((schedule, index) => (
        <div key={schedule.id} className="w-full mb-6 p-6 border rounded-lg bg-gray-50 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">{index + 1}일차</h3>

          {/* 날짜 및 시간 선택 */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">📅 날짜 및 시간</label>
            <input
              type="datetime-local"
              value={schedule.dateTime}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].dateTime = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>

          {/* 출발지 입력 */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">🚗 출발 장소</label>
            <input
              type="text"
              placeholder="출발지를 입력하세요"
              value={schedule.departure}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].departure = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>

          {/* 출발지 구글 지도 링크 */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">📍 출발지 구글 지도 링크</label>
            <input
              type="text"
              placeholder="구글 지도 링크를 입력하세요"
              value={schedule.departureLink}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].departureLink = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg text-lg"
            />
            <button
              onClick={() => openMapLink(schedule.departureLink)}
              className="text-blue-600 underline text-lg mt-2"
            >
              🔗 구글 지도 확인
            </button>
          </div>

    

          {/* 골프장 선택 */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">🏌️‍♂️ 골프장 선택</label>
            <select
              value={schedule.golfCourse}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].golfCourse = e.target.value;
                updatedSchedules[index].customGolfCourse = "";
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg text-lg"
            >
              <option value="">골프장을 선택하세요</option>
              {hanoiGolfCourses.map((course, i) => (
                <option key={i} value={course}>
                  {course}
                </option>
              ))}
              <option value="custom">직접 입력</option>
            </select>

            {schedule.golfCourse === "custom" && (
              <input
                type="text"
                placeholder="골프장 직접 입력"
                value={schedule.customGolfCourse}
                onChange={(e) => {
                  const updatedSchedules = [...schedules];
                  updatedSchedules[index].customGolfCourse = e.target.value;
                  setSchedules(updatedSchedules);
                }}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
            )}
          </div>

          {/* ❌ 일정 삭제 버튼 */}
          <button
            onClick={() => removeSchedule(schedule.id)}
            className="bg-red-500 text-white p-3 rounded-lg text-lg w-full"
          >
            ❌ 일정 삭제
          </button>
        </div>
      ))}

      <button onClick={addSchedule} className="bg-green-600 text-white p-3 rounded-lg text-lg w-full mt-4">
        ➕ 일정 추가
      </button>
      <button onClick={handleSaveTemp} className="bg-yellow-500 text-white p-3 rounded-lg text-lg w-full mt-4">
        💾 임시 저장
      </button>
      <button onClick={handleRequestQuotation} className="bg-blue-600 text-white p-3 rounded-lg text-lg w-full mt-2">
        📩 견적 요청
      </button>
    </div>
  );
}
