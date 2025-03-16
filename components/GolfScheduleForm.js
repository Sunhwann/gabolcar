"use client";

import { useState } from "react";

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
  const [schedules, setSchedules] = useState([
    { id: 1, departure: "", golfCourse: "", customGolfCourse: "", arrival: "", googleMapLinks: ["", "", ""], pickupTime: "", teetime: "" }
  ]);

  const openMapLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  const addSchedule = () => {
    setSchedules([
      ...schedules,
      { id: schedules.length + 1, departure: "", golfCourse: "", customGolfCourse: "", arrival: "", googleMapLinks: ["", "", ""], pickupTime: "", teetime: "" }
    ]);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">⛳ 골프 여행 일정</h2>

      {schedules.map((schedule, index) => (
        <div key={schedule.id} className="w-full mb-6 p-6 border rounded-lg bg-gray-50 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">{index + 1}일차</h3>
          
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
            <button onClick={() => openMapLink(schedule.googleMapLinks[0])} className="text-blue-600 underline text-lg mt-2">🔗 구글 지도 확인</button>
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
                <option key={i} value={course}>{course}</option>
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

          {/* 도착지 입력 */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">📍 도착 장소</label>
            <input
              type="text"
              placeholder="도착지를 입력하세요"
              value={schedule.arrival}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].arrival = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg text-lg"
            />
            <button onClick={() => openMapLink(schedule.googleMapLinks[2])} className="text-blue-600 underline text-lg mt-2">🔗 구글 지도 확인</button>
          </div>

          {/* 차량 픽업 시간 */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">🚖 차량 픽업 시간</label>
            <input
              type="time"
              value={schedule.pickupTime}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].pickupTime = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>

          {/* 티업 시간 */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">⏰ 티업 시간</label>
            <input
              type="time"
              value={schedule.teetime}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].teetime = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>
        </div>
      ))}

      {/* 일정 추가 버튼 */}
      <button onClick={addSchedule} className="bg-green-600 text-white p-3 rounded-lg text-lg w-full mt-4">➕ 일정 추가</button>
    </div>
  );
}
